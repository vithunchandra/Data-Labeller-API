const {
  Data,
  Task,
  TaskType,
  PossibleClassification,
  User,
} = require("../models");
const { default: axios } = require("axios");
const { getMaxId } = require("../utils/util");
const jwt = require("jsonwebtoken");
const conn = require("../databases/connection");
const { QueryTypes } = require("sequelize");

const queryHuggingFace = async (textToBeSummarized) => {
  const opts = {
    headers: {
      Authorization: `Bearer ${process.env.HUGGINGFACE_ACCESS_TOKEN}`,
    },
  };

  let text_now = "Summarize in few word :" + "\n";
  text_now += textToBeSummarized;
  text_now += "\n" + "Summary:";

  const params = {
    inputs: text_now,
    temperature: 0.4,
    max_new_tokens: 128,
    do_sample: true,
  };

  const perintah = await axios.post(
    "https://api-inference.huggingface.co/models/bigscience/bloom",
    params,
    opts
  );

  return perintah.data;
};

const addData = async (req, res) => {
  let { task_id, data_text } = req.body;
  const tokenNow = req.headers["x-auth-token"];

  let taskNow = await Task.findByPk(task_id);
  if (!taskNow) {
    return res.status(404).json({
      status: 404,
      body: {
        message: "task id not found!",
      },
    });
  }

  if (String(taskNow["status"]).toLowerCase() != "active") {
    return res.status(400).json({
      status: 400,
      body: {
        message: "That task is already closed!",
      },
    });
  }

  let taskType = await TaskType.findByPk(taskNow["type_id"]);
  let charNum = String(data_text).length;
  let labelNum = 0;

  let userData = [];
  try {
    userData = jwt.verify(tokenNow, process.env.JWT_TOKEN_SECRET);
  } catch {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  }
  userData = await User.findByPk(userData["username"]);

  if (userData["username"] != taskNow["username"]) {
    return res.status(403).json({
      status: 403,
      message: "Data can only be created by the one who create the task",
    });
  }

  if (taskType["type_name"] == "Classification") {
    let allPosClass = await PossibleClassification.findAll({
      where: {
        task_id: task_id,
      },
    });

    labelNum = allPosClass.length;
  }

  // GET HARGA DAN KURANGI UANG
  let priceNow = Math.ceil(
    (charNum * taskType["price_char"]) / 10 + labelNum * 10
  );
  if (userData["saldo"] < priceNow * taskNow["max_labeller"]) {
    return res.status(400).json({
      status: 400,
      message: `Saldo anda tidak cukup, uang yang dibutuhkan adalah ${
        priceNow * taskNow["max_labeller"]
      }, sedangkan uang anda ${userData["saldo"]}`,
    });
  } else {
    userData.increment({ saldo: -(priceNow * taskNow["max_labeller"]) });
  }

  if (String(taskType["type_name"]).toLowerCase() == "bot summarization") {
    console.log(data_text);
    const result = await queryHuggingFace(data_text);
    const summary = result[0]["generated_text"];

    data_text = data_text + "\n\n Summary : " + summary;
  }

  const nowDate = new Date();
  let idNow =
    "D" +
    nowDate.getFullYear() +
    nowDate.getMonth() +
    nowDate.getDate() +
    nowDate.getDay() +
    nowDate.getHours();
  idNow = await getMaxId("data", "data_id", idNow, 5);

  const showData = {
    data_id: idNow,
    task_id: task_id,
    data_text: data_text,
    per_labeller_price: priceNow,
    price_you_pay: priceNow * taskNow["max_labeller"],
    remaining_money: userData["saldo"] - priceNow * taskNow["max_labeller"],
  };

  const newData = {
    data_id: idNow,
    task_id: task_id,
    data_text: data_text,
    price: priceNow,
  };

  await Data.create(newData);

  res.json({
    status: 200,
    body: {
      message: "Succesfully Created",
      showData,
    },
  });
};

const labeller_get_data = async (req, res) => {
  const {
    type_id,
    requirement_fulfilled,
    page,
    data_per_page,
    price_sort_ascending,
  } = req.query;

  const tokenNow = req.headers["x-auth-token"];
  let userData = [];
  try {
    userData = jwt.verify(tokenNow, process.env.JWT_TOKEN_SECRET);
  } catch {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  }
  userData = await User.findByPk(userData["username"]);
  if (String(userData["role"]).toLowerCase() != "labeller") {
    return res.status(403).json({
      status: 403,
      message: "only labeller can search data",
    });
  }

  sort_args = "DESC";
  if (price_sort_ascending) {
    if (price_sort_ascending == "true") {
      sort_args = "ASC";
    }
  }

  req_args = false;
  if (requirement_fulfilled) {
    if (requirement_fulfilled == "true") {
      req_args = true;
    }
  }

  console.log(req_args);

  let offset = data_per_page * page;

  let sqlString = "";
  let results = {};

  sqlString = `SELECT tasks.task_id, data.data_id, data.data_text, task_types.type_name, data.price, tasks.minimal_credibility FROM data,tasks,task_types `;
  sqlString += `WHERE (data.task_id = tasks.task_id) and (tasks.type_id = :type_id) `;
  if (req_args) {
    sqlString += `AND (SELECT credibility from users where username = :username) >= tasks.minimal_credibility `;
  }
  sqlString += `and (task_types.type_id = tasks.type_id) and (tasks.status = 'active') `;
  sqlString += `order by price ${sort_args} limit ${data_per_page} offset ${offset} ;`;

  results = await conn.query(sqlString, {
    type: QueryTypes.SELECT,
    replacements: {
      type_id: type_id,
      username: userData["username"],
    },
  });

  if (type_id == "TT001" && results.length > 0) {
    results = await Promise.all(
      results.map(async (item) => {
        possible = await PossibleClassification.findAll({
          attributes: ["possible_name"],
          where: {
            task_id: item["task_id"],
          },
        });
        possible = possible.map((item2) => {
          return item2.possible_name;
        });
        item.possible = possible;
        return item;
      })
    );
  }

  return res.status(200).json({
    status: 200,
    results,
  });
};

module.exports = {
  addData,
  labeller_get_data,
};
