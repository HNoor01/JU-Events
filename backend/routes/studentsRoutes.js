const express = require('express');
const router = express.Router();
const { studentLogin }= require('../controller/studentsController.js');

router.post('/login', studentLogin);

module.exports = router;
