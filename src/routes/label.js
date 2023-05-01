const express = require('express');
const router = express.Router();
const {authorization} = require('../middlewares/middleware');
const { labeling, updateLabel } = require('../controllers/label');

router.post('/label', [authorization], labeling);
router.put('/label', [authorization], updateLabel);

module.exports = router