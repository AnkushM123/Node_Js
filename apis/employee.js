const express = require('express');
const app = express();
const employeeService = require('../core/services/employee-service')
const upload = require('../Image-api');
const employeeModel = require('../schema/employee-schema');
const cors = require('cors')
app.use(cors())
const employeeRoute = express.Router();

/**
 *  @swagger
 * /employee/getEmployee:
 *   get:
 *     description: Get a list of all employees
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully retrieved list of employees
 *       404:
 *         description: No employees found
 *       500:
 *         description: Internal server error
 */

employeeRoute.get("/getEmployee", async (req, res) => {
    const data = await employeeService.getEmployee();
    res.send(data);
})


/**
* @swagger
* /employee/getEmployee/{id}:
*   get:
*     description: Retrieve employee from the server.
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*          type: string
*     produces:
*          - application/json   
*     responses:
*       200:
*         description: Successfully employee
*       404:
*         description: No employee found
*       500:
*         description: Internal server error
*    
*/

employeeRoute.get("/getEmployee/:id", async (req, res) => {
    const employee = await employeeService.getEmployeeById(req.params.id);
    res.send(employee);

})

/**
* @swagger
* /employee/createEmployee:
*     post:
*      requestBody:
*        content:
*          multipart/form-data:
*            schema:
*              type: object
*              properties:
*                avatar:
*                  type: string
*                  format: binary
*                name:
*                 type: string
*                address:
*                 type: string
*                age:
*                 type: integer
*                mobile:
*                 type: string
*                is_active:
*                 type: boolean
*                date:
*                 type: string
*                 format: date
*      responses:
*       '200':
*         description: employee added successfully
*       '404':
*         description: employee not found
*       '500':
*         description: Internal server error
*/

employeeRoute.post("/createEmployee", upload.single('avatar'), async (req, res) => {
    const employee = new employeeModel({
        name: req.body.name,
        address: req.body.address,
        age: req.body.age,
        mobile: req.body.mobile,
        is_active: req.body.is_active,
        avatar: req.file.path
    })
    const data = await employeeService.createEmployee(employee);
    res.send(data);

})

/**
* @swagger
* /employee/editEmployee/{id}:
*  put:
*     description: Update an existing employee using its ID.
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*          type: string
*     requestBody:
*       required: true
*       content:
*          multipart/form-data:
*           schema:
*             type: object 
*             properties:
*               avatar:
*                  type: string
*                  format: binary
*               name:
*                 type: string
*               address:
*                 type: string
*               age:
*                 type: integer
*               mobile:
*                 type: string
*               is_active:
*                 type: boolean
*               date:
*                 type: string
*                 format: date 
*     responses:
*       '200':
*         description: employee updated successfully
*       '404':
*         description: employee not found
*       '500':
*         description: Internal server error
*/

employeeRoute.put("/editEmployee/:id", upload.single('avatar'), async (req, res) => {
    const employee = ({
        name: req.body.name,
        address: req.body.address,
        age: req.body.age,
        mobile: req.body.mobile,
        is_active: req.body.is_active,
        avatar: req.file.path
    })
    const data = await employeeService.editEmployee(employee, req.params.id);
    res.send(data)
})

/**
* @swagger
* /employee/removeEmployee/{id}:
*  delete:
 *     description: delete an existing employee using its ID.
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*          type: string
 *     responses:
*       '200':
*         description: employee deleted successfully
*       '404':
*         description: employee not found
*       '500':
*         description: Internal server error     
*/

employeeRoute.delete("/removeEmployee/:id", async (req, res) => {
    await employeeService.deleteEmployee(req.params.id);
    res.send("Employee deleted succcessfully");

})

module.exports = employeeRoute;
