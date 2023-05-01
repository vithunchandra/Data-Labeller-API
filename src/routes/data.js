const express = require("express");
const router = express.Router();
const { addData } = require("../controllers/data");

router.post("/", addData);

module.exports = router;
