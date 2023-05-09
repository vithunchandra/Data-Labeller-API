const express = require("express");
const router = express.Router();
const {authorization} = require('../middlewares/middleware');
const { register , login, userDetail } = require("../controllers/user");

router.post("/register", register);
router.post("/login", login);
router.get('/:username?', [authorization], userDetail);
module.exports = router;
