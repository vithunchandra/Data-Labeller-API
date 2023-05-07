const express = require("express");
const router = express.Router();
const { addTask, get_tasks } = require("../controllers/task");

router.post("/", addTask);
router.get("/", get_tasks);

module.exports = router;
