const express = require("express");
const router = express.Router();
const {authorization} = require('../middlewares/middleware');
const { register , login, topup, retrive_money, userDetail } = require("../controllers/user");

router.post("/register", register);
router.post("/login", login);
router.put("/topup/:username", topup);
router.put("/retrive/:username", retrive_money);
router.get('/:username?', [authorization], userDetail);
module.exports = router;
