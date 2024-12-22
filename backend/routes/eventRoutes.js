const express = require('express');
const router = express.Router();
const { createEventRequest } = require('../controller/eventController');



// إنشاء طلب
router.post('/', createEventRequest);


module.exports = router;
