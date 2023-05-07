const express = require("express");
const router = express.Router();
const { addData, labeller_get_data } = require("../controllers/data");

router.post("/", addData);
router.get("/", labeller_get_data);

module.exports = router;
