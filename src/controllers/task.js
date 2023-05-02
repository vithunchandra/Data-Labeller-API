const { Data, Task, TaskType } = require("../models");
const { taskValidation } = require("../validation/taskValidation");
const { getMaxId } = require("../utils/util");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const addTask = async (req, res) => {
  const { type_id, max_labeller, closeDate, minimal_credibility } = req.body;
  const tokenNow = req.headers["x-auth-token"];

  console.log(req.body);

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

  const taskType = await TaskType.findByPk(type_id);

  let idNow = String(taskType["type_name"]).substring(0, 2).toUpperCase();
  idNow += String(userData["username"]).substring(0, 2).toUpperCase();
  idNow +=
    String(closeDate).split("-")[0] +
    String(closeDate).split("-")[1] +
    String(closeDate).split("-")[2];

  let maxId = await getMaxId("tasks", "task_id", idNow, 4);
  let dateClose = new Date("1991-01-01"); //new Date(closeDate);

  await Task.create({
    task_id: maxId,
    type_id: type_id,
    username: userData["username"],
    max_labeller: max_labeller,
    closeDate: dateClose,
    status: "active",
    minimal_credibility: minimal_credibility,
  });

  if (taskType["type_name"] == "Classification") {
    const { possible_class } = req.body;
    if (possible_class == "" || !possible_class) {
      return res.json({
        status: 400,
        message: "classification must have possible_class",
      });
    }
  }

  // console.log(dateClose);

  return res.status(200).json({
    status: 200,
    message: "Task sucesfully created!",
  });
};

module.exports = {
  addTask,
};
