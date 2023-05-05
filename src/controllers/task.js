const {
  Data,
  Task,
  TaskType,
  PossibleClassification,
  User,
} = require("../models");
const { taskValidation } = require("../validation/taskValidation");
const { getMaxId } = require("../utils/util");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const addTask = async (req, res) => {
  const { type_id, max_labeller, closeDate, minimal_credibility } = req.body;
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
    String(closeDate).split("-")[0] +
    String(closeDate).split("-")[1] +
    String(closeDate).split("-")[2];

  let maxId = await getMaxId("tasks", "task_id", idNow, 4);
  let dateClose = new Date(closeDate); //new Date(closeDate);

  let newTask = {
    task_id: maxId,
    type_id: type_id,
    username: userData["username"],
    max_labeller: max_labeller,
    closeDate: dateClose,
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
  const {task_id} = req.params;
  const {user} = req.user;
  if(user.role !== "requester"){
    return res.status(403).json({message: "Endpoint is allowed for user with requester role only"});
  }
  let task = await Task.findByPk(task_id);
  if(!task){
    return res.status(404).json({message: "Task not found"});
  }
  const taskType = await TaskType.findByPk(task.type_id);
  const data = await Data.findAll({where: {task_id}});
  let payChange = 0;
  let cost = 0;
  let maxCost = 0;
  let dataResult = [];
  for(const datum of data){
    const labels = await Label.findAll({where: {data_id: datum.data_id}});
    for(const label of labels){
      const labeller = await User.findByPk(label.username);
      await labeller.update({
        saldo: Number(saldo) + Number(datum.price)
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
      final_data_cost: currentCost
    });
  }
  await user.update({
    saldo: Number(saldo) + payChange
  });

  task = await task.update({
    status: "closed"
  });

  return res.status(200).json({body: {
    message: "Task closed successfully",
    task_id,
    task_type: taskType.type_name,
    max_labeller: task.max_labeller,
    status: task.status,
    maximal_cost: maxCost,
    final_cost: cost,
    pay_change: payChange,
    data: dataResult
  }});
};

module.exports = {
  addTask,
};
