const express = require('express');
const router = express.Router();
const registerUser = require('../apis/login')
const upload = require('../Image-api')

router.route("/").post(upload.single('avatar'), registerUser.register);

module.exports = router; 