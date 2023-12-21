const express = require('express');
const router = express.Router();
const employee = require('../apis/employee');
const upload = require('../Image-api')
const login=require('../apis/login')

router.route("/").get(login.authenticateToken,employee.getEmployee)
    .post(login.authenticateToken,upload.single('avatar'), employee.createEmployee);

router.route("/:id").get(login.authenticateToken,employee.getEmployeeById)
    .put(login.authenticateToken,upload.single('avatar'), employee.editEmployee)
    .delete(login.authenticateToken,employee.deleteEmployee);


module.exports = router 