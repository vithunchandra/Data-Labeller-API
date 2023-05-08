const express = require("express");
const router = express.Router();
const {
  addTask,
  get_tasks,
  get_task,
  get_task_type,
} = require("../controllers/task");

router.post("", addTask);
router.get("", get_tasks);
router.get("/:task_id", get_task);
router.get("/task_type/get_all", get_task_type);

module.exports = router;
