const jwt = require('jsonwebtoken');
const employeeService = require('../core/services/employee-service');
const userService = require('../core/services/user-service');
const employeeModel = require('../core/schema/employee-schema');
const userModel = require('../core/schema/user-schema')
const validator = require('validator');

/**
* @swagger
* /register:
*     post:
*      tags: [Register]
*      requestBody:
*        content:
*          multipart/form-data:
*            schema:
*              type: object
*              properties:
*                email:
*                 type: string
*                password:
*                 type: string
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
*         description: employee registered successfully
*       '500':
*         description: Internal server error
*       '400':
*         description: Bad Request
*/

const register = async (req, res) => {
    if (validator.isEmpty(req.body.email))
        res.status(400).send("email is required");

    if (validator.isEmpty(req.body.password))
        res.status(400).send("password is required");

    if (validator.isEmpty(req.body.name))
        res.status(400).send("name is required");

    if (validator.isEmpty(req.body.address))
        res.status(400).send("address is required");

    if (validator.isEmpty(req.body.age))
        res.status(400).send("age is required");

    if (validator.isEmpty(req.body.mobile))
        res.status(400).send("mobile is required");


    if (validator.isEmail(req.body.email)) {
        const _email = await userService.getUserByEmail(req.body.email);
        if (_email.length > 0) {
            res.status(400).send("email-Id is already present");
        }
    } else {
        res.status(400).send("please enter valid email");
    }

    let user = new userModel({
        email: req.body.email,
        password: req.body.password
    })

    let userData = await userService.createUser(user);

    let employee = new employeeModel({
        name: req.body.name,
        address: req.body.address,
        age: req.body.age,
        mobile: req.body.mobile,
        is_active: req.body.is_active,
        avatar: req.file.path,
        user_id: userData._id
    })
    let employeeData = await employeeService.createEmployee(employee);

    res.send("employee registered successfully");
}

const secretKey = 'dcsgjvjcddsdhvscskh';

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Token missing' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden: Invalid token' });
        }
        req.user = user;
        next();
    });
};

/**
* @swagger
* /login:
*   post:
*     tags: [Login]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               email:
*                 type: string
*               password:
*                 type: string 
*     produces:
*         application/json
*     responses:
*       200:
*         description: successfully Logged-In
*       400:
*         description: Bad request
*/

const login = async (req, res) => {
    const data=await userService.getUserByEmailAndPassword(req.body)
    
    const user={"email":data.email}

    if(data.length>0){
    const token = jwt.sign(user, secretKey, { expiresIn: '1h' });

    res.json({ token });
    }else{
        res.status(400).send("Credential are incorrect");
    }
};

module.exports = { register, login, authenticateToken };
