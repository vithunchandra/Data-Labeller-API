const {
  Data,
  Task,
  TaskType,
  PossibleClassification,
  User,
  Label,
  Sequelize,
} = require("../models");
const { taskValidation } = require("../validation/taskValidation");
const { getMaxId } = require("../utils/util");
const jwt = require("jsonwebtoken");
const { Op, QueryTypes } = require("sequelize");
const conn = require("../databases/connection");
const { default: axios } = require("axios");

require("dotenv").config();

const addTask = async (req, res) => {
  const { type_id, max_labeller, close_date, minimal_credibility } = req.body;
  const tokenNow = req.headers["x-auth-token"];

  try {
    await taskValidation.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  let userData = [];
  try {
    userData = jwt.verify(tokenNow, process.env.JWT_TOKEN_SECRET);
  } catch {
    return res.json({
      status: 400,
      message: "unverified",
    });
  }
  userData = await User.findByPk(userData["username"]);

  if (String(userData["role"]).toLowerCase() != "requester") {
    return res.json({
      status: 400,
      message: "Task must be created by requester",
    });
  }

  const taskType = await TaskType.findByPk(type_id);

  let idNow = String(taskType["type_name"]).substring(0, 2).toUpperCase();
  idNow += String(userData["username"]).substring(0, 2).toUpperCase();
  idNow +=
    String(close_date).split("-")[0] +
    String(close_date).split("-")[1] +
    String(close_date).split("-")[2];

  let maxId = await getMaxId("tasks", "task_id", idNow, 4);
  let dateClose = new Date(close_date); //new Date(closeDate);

  let newTask = {
    task_id: maxId,
    type_id: type_id,
    username: userData["username"],
    max_labeller: max_labeller,
    close_date: dateClose,
    status: "active",
    minimal_credibility: minimal_credibility,
  };

  if (String(taskType["type_name"]).toLowerCase() == "classification") {
    const { possible_class } = req.body;
    if (possible_class == "" || !possible_class) {
      return res.json({
        status: 400,
        message: "classification must have possible_class",
      });
    }

    await Task.create(newTask);
    possible_class.forEach(async (element) => {
      temp_prefix =
        idNow.substring(0, 4) +
        String(element[0]).toUpperCase() +
        String(element[element.length - 1]).toUpperCase();

      let posClasIdNow = await getMaxId(
        "possible_classifications",
        "possible_id",
        temp_prefix,
        4
      );

      await PossibleClassification.create({
        possible_id: posClasIdNow,
        task_id: newTask["task_id"],
        possible_name: element,
      });
    });
  } else {
    await Task.create(newTask);
  }

  // console.log(dateClose);

  return res.status(200).json({
    status: 200,
    task_id: newTask["task_id"],
    message: "Task sucesfully created!",
  });
};

const closeTask = async (req, res) => {
  const { task_id } = req.params;
  const { user } = req.user;
  if (user.role !== "requester") {
    return res.status(403).json({
      message: "Endpoint is allowed for user with requester role only",
    });
  }
  let task = await Task.findByPk(task_id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  const taskType = await TaskType.findByPk(task.type_id);
  const data = await Data.findAll({ where: { task_id } });
  let payChange = 0;
  let cost = 0;
  let maxCost = 0;
  let dataResult = [];
  for (const datum of data) {
    const labels = await Label.findAll({ where: { data_id: datum.data_id } });
    for (const label of labels) {
      const labeller = await User.findByPk(label.username);
      await labeller.update({
        saldo: Number(saldo) + Number(datum.price),
      });
    }
    const currentCost = labels.length * Number(datum.price);
    const totalCost = Number(task.max_labeller) * Number(datum.price);
    cost += currentCost;
    maxCost += totalCost;
    payChange += totalCost - currentCost;
    dataResult.push({
      data_id: datum.data_id,
      data_text: datum.data_text,
      data_price: datum.data_price,
      total_label: labels.length,
      total_data_cost: totalCost,
      final_data_cost: currentCost,
    });
  }
  await user.update({
    saldo: Number(saldo) + payChange,
  });

  task = await task.update({
    status: "closed",
  });

  return res.status(200).json({
    body: {
      message: "Task closed successfully",
      task_id,
      task_type: taskType.type_name,
      max_labeller: task.max_labeller,
      status: task.status,
      maximal_cost: maxCost,
      final_cost: cost,
      pay_change: payChange,
      data: dataResult,
    },
  });
};

const get_tasks = async (req, res) => {
  let { type_id, requirement_fulfilled, page, data_per_page } = req.query;
  const tokenNow = req.headers["x-auth-token"];

  let userData = [];
  try {
    userData = jwt.verify(tokenNow, process.env.JWT_TOKEN_SECRET);
  } catch {
    return res.json({
      status: 400,
      message: "unverified",
    });
  }
  userData = await User.findByPk(userData["username"]);

  req_args = false;
  if (requirement_fulfilled) {
    if (requirement_fulfilled == "true") {
      req_args = true;
    }
  }

  if (String(userData["role"]).toLowerCase() == "labeller") {
    let sqlNow = `SELECT t.task_id,task_types.type_name,username,max_labeller,close_date,status,minimal_credibility `;
    sqlNow += `FROM tasks t,  task_types `;
    sqlNow += `where task_types.type_id = t.type_id `;
    if (type_id) {
      sqlNow += `AND t.type_id = :type_id `;
    }
    if (req_args) {
      sqlNow += `AND (SELECT credibility from users where username = :username) >= t.minimal_credibility `;
    }
    sqlNow += `LIMIT ${data_per_page} offset ${page * data_per_page} `;

    results = await conn.query(sqlNow, {
      type: QueryTypes.SELECT,
      replacements: {
        type_id: type_id,
        username: userData["username"],
      },
    });

    if (results.length > 0) {
      // results = await Promise.all(
      //   results.map(async (item) => {
      //     const opts = {
      //       headers: {
      //         "x-auth-token": tokenNow,
      //       },
      //     };
      //     const perintah = await axios.get(
      //       "http://localhost:3000/api/v1/task/" + item["task_id"],
      //       opts
      //     );
      //     return perintah.data.result;
      //     // return item;
      //   })
      // );

      for (var i = 0; i < results.length; i++) {
        let item = results[i];
        const opts = {
          headers: {
            "x-auth-token": tokenNow,
          },
        };
        const perintah = await axios.get(
          "http://localhost:3000/api/v1/task/" + item["task_id"],
          opts
        );

        results[i] = perintah.data.result;
      }
    }

    return res.json(results);
  } else {
    let sqlNow = `SELECT t.task_id,task_types.type_name,username,max_labeller,close_date,status,minimal_credibility `;
    sqlNow += `FROM tasks t,  task_types `;
    sqlNow += `where task_types.type_id = t.type_id `;
    sqlNow += `AND t.username = :username `;
    if (type_id) {
      sqlNow += `AND t.type_id = :type_id `;
    }
    sqlNow += `LIMIT ${data_per_page} offset ${page * data_per_page} `;

    results = await conn.query(sqlNow, {
      type: QueryTypes.SELECT,
      replacements: {
        type_id: type_id,
        username: userData["username"],
      },
    });

    // return res.json(results);

    if (results.length > 0) {
      for (var i = 0; i < results.length; i++) {
        let item = results[i];
        const opts = {
          headers: {
            "x-auth-token": tokenNow,
          },
        };
        const perintah = await axios.get(
          "http://localhost:3000/api/v1/task/" + item["task_id"],
          opts
        );

        results[i] = perintah.data.result;
      }

      // results = await Promise.all(
      //   results.map(async (item) => {
      //     const opts = {
      //       headers: {
      //         "x-auth-token": tokenNow,
      //       },
      //     };
      //     const perintah = await axios.get(
      //       "http://localhost:3000/api/v1/task/" + item["task_id"],
      //       opts
      //     );

      //     return perintah.data.result;
      //   })
      // );
    }

    return res.json({
      status: 200,
      results,
    });
  }
};

const get_task = async (req, res) => {
  const { task_id } = req.params;
  const tokenNow = req.headers["x-auth-token"];
  console.log("TASK ID NOW : " + task_id);

  let userData = [];
  try {
    userData = jwt.verify(tokenNow, process.env.JWT_TOKEN_SECRET);
  } catch {
    return res.json({
      status: 400,
      message: "unverified",
    });
  }
  userData = await User.findByPk(userData["username"]);

  item = await Task.findByPk(task_id, {
    attributes: [
      "task_id",
      [Sequelize.col("TaskType.type_name"), "type_name"],
      "username",
      "max_labeller",
      "close_date",
      "status",
      "minimal_credibility",
    ],
    include: [{ model: TaskType, attributes: [] }],
    raw: true,
  });

  if (String(item["type_name"]).toLowerCase() == "classification") {
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
  }

  let creator = false;
  if (userData["username"] == item["username"]) {
    creator = true;
  }

  dataFound = await Data.findAll({
    attributes: ["data_id", "data_text", "price"],
    where: {
      task_id: item["task_id"],
    },
    raw: true,
  });

  dataFound = await Promise.all(
    dataFound.map(async (itemData) => {
      let countLabelled = await Label.findAll({
        attributes: ["username", "label_result"],
        where: {
          data_id: itemData["data_id"],
        },
        raw: true,
      });

      if (creator) {
        itemData.label = countLabelled;
      }

      itemData.labelled = countLabelled.length;

      return itemData;
    })
  );

  item.data = dataFound;
  return res.json({
    status: 200,
    result: item,
  });
};

const get_task_type = async (req, res) => {
  let task_types = await TaskType.findAll();

  return res.json({
    status: 200,
    task_types,
  });
};

module.exports = {
  addTask,
  get_tasks,
  get_task,
  get_task_type,
};
