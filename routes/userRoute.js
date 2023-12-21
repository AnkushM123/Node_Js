const express = require('express');
const router = express.Router();
const user = require('../apis/user')
const login=require('../apis/login')

router.route("/").get(login.authenticateToken,user.getUser)
    .post(login.authenticateToken,user.createUser)

router.route("/:id").get(login.authenticateToken,user.getUserById)
    .put(login.authenticateToken,user.editUser)
    .delete(login.authenticateToken,user.deleteUser);

module.exports = router