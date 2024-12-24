const express = require('express');
const router = express.Router();
const { createEventRequest, respondToEventRequest } = require('../controller/eventController.js');



// إنشاء طلب
router.post('/create', createEventRequest);

// مسار لرد المسؤول على طلب الفعالية
router.post('/respond', respondToEventRequest);



module.exports = router;
