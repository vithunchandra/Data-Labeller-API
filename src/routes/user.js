const express = require("express");
const router = express.Router();
const {authorization} = require('../middlewares/middleware');
const { register , login, topup, topupHistory, retrive_money, withdrawHistory, userDetail, banUser, getBanUser, removeBan } = require("../controllers/user");

router.post("/register", register);
router.post("/login", login);
router.put("/topup/:username", topup);
router.get('/topup/history', [authorization], topupHistory);
router.put("/retrive/:username", retrive_money);
router.get('/withdraw/history', [authorization], withdrawHistory);
router.get('/:username?', [authorization], userDetail);
router.post('/ban', [authorization], banUser);
router.get('/ban/list', [authorization], getBanUser);
router.delete('/remove_ban', [authorization], removeBan);
module.exports = router;
