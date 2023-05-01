const { Data, Task, TaskType } = require("../models");

const addData = async (req, res) => {
  const { task_id, data_text } = req.body;

  let taskNow = await Task.findByPk(task_id);
  let taskType = await TaskType.findByPk(taskNow["type_id"]);
  return res.json(taskType);
  if (!taskNow) {
    return res.status(404).json({
      status: 404,
      body: {
        message: "task id not found!",
      },
    });
  }

  const newData = {
    data_id: "1",
    task_id: task_id,
    data_text: data_text,
    price: 0,
  };

  res.json(taskNow);
};

module.exports = {
  addData,
};
