const express = require('express');
const router = express.Router();
const {authorization} = require('../middlewares/middleware');
const { labeling, updateLabel, getLabel } = require('../controllers/label');

router.post('/label', [authorization], labeling);
router.put('/label', [authorization], updateLabel);
router.get('/label', [authorization], getLabel);

module.exports = router