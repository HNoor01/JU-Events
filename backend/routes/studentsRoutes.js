const express = require('express');
const studentsController = require("../controller/studentsController");

const router = express.Router();


router.post('/login', studentsController.login);

module.exports = router;
