const employeeService = require('../core/services/employee-service')
const employeeModel = require('../core/schema/employee-schema');

/**
*  @swagger
* /employee:
*   get:
*     security: 
*          - Bearer: []
*     description: Get a list of all employees
*     tags: [Employee]
*     produces:
*       - application/json
*     responses:
*       200:
*         description: Success
*         content:
*           application/json:
*            schema:
*              type: object
*              properties:
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
*                avatar:
*                  type: string
*       404:
*         description: No data
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'No data found'
*/

const getEmployee = async (req, res) => {
    let data = await employeeService.getEmployee();
    if (data.length > 0)
        res.send(data);
    else {
        res.status(404).json("No data found");
    }
}

/**
* @swagger
* /employee/{id}:
*   get:
*     security: 
*          - Bearer: []
*     description: Retrieve employee from the server.
*     tags: [Employee]
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
*         description: Success
*         content:
*           application/json:
*            schema:
*              type: object
*              properties:
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
*                avatar:
*                  type: string
*       404:
*         description: No data
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'No data found'
*       500:
*         description: Internal server error
*       400:
*         description: Invalid Id
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'Invalid Id format'    
*/

const getEmployeeById = async (req, res) => {
    let isValidObjectId = (id) => {
        const objectIdRegex = /^[0-9a-fA-F]{24}$/;

        return objectIdRegex.test(id);
    };

    if (isValidObjectId(req.params.id)) {
        let employee = await employeeService.getEmployeeById(req.params.id);
        if (employee.length > 0)
            res.send(employee);
        else
            res.status(404).json("No data found");

    } else {
        res.status(400).json("Invalid Id Format");
    }
}

/**
* @swagger
* /employee:
*     post:
*      security: 
*          - Bearer: []
*      tags: [Employee]
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
*         description: Success
*         content:
*           application/json:
*            schema:
*              type: object
*              properties:
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
*                avatar:
*                  type: string
*       '500':
*         description: Internal server error
*/

const createEmployee = async (req, res) => {
    console.log(req.body);
    let employee = new employeeModel({
        name: req.body.name,
        address: req.body.address,
        age: req.body.age,
        mobile: req.body.mobile,
        is_active: req.body.is_active,
        avatar: req.file.path
    })
    let data = await employeeService.createEmployee(employee);
    res.send(data);
}

/**
* @swagger
* /employee/{id}:
*  put:
*     security: 
*          - Bearer: []
*     description: Update an existing employee using its ID.
*     tags: [Employee]
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
*         description: Success
*         content:
*           application/json:
*            schema:
*              type: object
*              properties:
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
*                avatar:
*                  type: string 
*       '404':
*         description: No data found
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'employee not found'
*       '500':
*         description: Internal server error
*/

const editEmployee = async (req, res) => {
    let employee = ({
        name: req.body.name,
        address: req.body.address,
        age: req.body.age,
        mobile: req.body.mobile,
        is_active: req.body.is_active,
        avatar: req.file.path
    })
    let data = await employeeService.editEmployee(employee, req.params.id);
    res.send(data)
}

/**
* @swagger
* /employee/{id}:
*  delete:
*     security: 
*          - Bearer: []
*     description: delete an existing employee using its ID.
*     tags: [Employee]
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*          type: string
*     responses:
*       '200':
*         description: Success
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'employee deleted successfully' 
*       '404':
*         description: No data found
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'employee not found' 
*       '500':
*         description: Internal server error     
*/

const deleteEmployee = async (req, res) => {
    let isValidObjectId = (id) => {
        const objectIdRegex = /^[0-9a-fA-F]{24}$/;
        return objectIdRegex.test(id);
    };

    if (isValidObjectId(req.params.id)) {
        let data = await employeeService.deleteEmployee(req.params.id);
        if (data.deletedCount > 0)
            res.send("employee deleted successfully");
        else
            res.status(404).json("No data found");

    } else {
        res.status(400).json("Invalid Id Format");
    }
}

module.exports = { getEmployee, getEmployeeById, createEmployee, editEmployee, deleteEmployee };
