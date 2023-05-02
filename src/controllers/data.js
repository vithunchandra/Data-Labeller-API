const { Data, Task, TaskType } = require("../models");
const { default: axios } = require("axios");
const { getMaxId } = require("../utils/util");

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
    temperature: 0,
    max_new_tokens: 16,
    do_sample: false,
  };

  const perintah = await axios.post(
    "https://api-inference.huggingface.co/models/google/flan-t5-xxl",
    params,
    opts
  );

  return perintah.data;
};

const addData = async (req, res) => {
  let { task_id, data_text } = req.body;

  let taskNow = await Task.findByPk(task_id);
  let taskType = await TaskType.findByPk(taskNow["type_id"]);
  let charNum = String(data_text).length;

  if (taskType["type_name"] == "Bot Summarization") {
    console.log(data_text);
    const result = await queryHuggingFace(data_text);
    const summary = result[0]["generated_text"];

    // console.log(result);

    data_text = data_text + "\n\n Summary : " + summary;
  }

  if (!taskNow) {
    return res.status(404).json({
      status: 404,
      body: {
        message: "task id not found!",
      },
    });
  }

  taskTypeNow = await TaskType.findByPk(taskNow["type_id"]);

  const nowDate = new Date();
  let idNow =
    "D" +
    nowDate.getFullYear() +
    nowDate.getMonth() +
    nowDate.getDate() +
    nowDate.getDay() +
    nowDate.getHours();
  idNow = await getMaxId("data", "data_id", idNow, 5);

  const newData = {
    data_id: idNow,
    task_id: task_id,
    data_text: data_text,
    price: Math.ceil((charNum * taskTypeNow["price_char"]) / 10),
  };

  await Data.create(newData);

  res.json({
    status: 200,
    body: {
      message: "Succesfully Created",
      newData,
    },
  });
};

module.exports = {
  addData,
};
