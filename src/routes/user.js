const express = require("express");
const router = express.Router();
const { register , login, userDetail } = require("../controllers/user");

router.post("/register", register);
router.post("/login", login);
router.get('/user', userDetail);
module.exports = router;
