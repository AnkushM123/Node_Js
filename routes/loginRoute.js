const express = require('express');
const router = express.Router();
const loginUser = require('../apis/login')
const upload = require('../Image-api')

router.route("/").post(loginUser.login);

module.exports = router; 