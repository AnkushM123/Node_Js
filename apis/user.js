const express = require('express');
const swaggerUi = require('swagger-ui-express');
const userService = require('../core/services/user-service')
const swaggerSpecs = require('../swagger');
const userRoute = express.Router();


/**
*  @swagger 
* /user:
*   get:
*     description: Get a list of all users
*     tags: [User]
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
*                email:
*                 type: string
*                password:
*                 type: string
*       404:
*         description: No data
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'No data found'
*/

userRoute.get("/", async (req, res) => {
    let data = await userService.getUser();
    if(data.length>0)
    res.send(data);
    else{
     res.status(404).json("No data found");   
    }
})


/**
* @swagger
* /user/{id}:
*   get:
*     description: Retrieve user from the server.
*     tags: [User]
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
*                email:
*                 type: string
*                password:
*                 type: string
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
*    
*/

userRoute.get("/:id", async (req, res) => {
    let isValidObjectId = (id) => {
        const objectIdRegex = /^[0-9a-fA-F]{24}$/;
      
        return objectIdRegex.test(id);
      };
      
      if (isValidObjectId(req.params.id)) {
        let employee = await userService.getUserById(req.params.id);
        if(employee.length>0)
        res.send(employee);
        else
         res.status(404).json("No data found");
    
      } else {
        res.status(400).json("Invalid Id Format");
      }
})

/**
* @swagger
* /user:
*   post:
*     tags: [User]
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
*         description: user created successfully
*       400:
*         description: Bad request
*/

userRoute.post("/", async (req, res) => {
    let data = await userService.createUser(req.body);
    res.send(data);
})

/**
* @swagger
*  /user/{id}:
*  put:
*     description: Update an existing user using its ID.
*     tags: [User]
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*          type: string
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
*     responses:
*       '200':
*         description: user updated successfully
*       '404':
*         description: user not found
*       '500':
*         description: Internal server error
*/

userRoute.put("/:id", async (req, res) => {
    let data = await userService.editUser(req.body, req.params.id);
    res.send(data)
})

/**
* @swagger
* /user/{id}:
*  delete:
*     description: delete an existing user using its ID.
*     tags: [User]
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
*               example: 'user deleted successfully' 
*       '404':
*         description: No data found
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'No data found' 
*       '500':
*         description: Internal server error     
*/

userRoute.delete("/:id", async (req, res) => {
    let isValidObjectId = (id) => {
        const objectIdRegex = /^[0-9a-fA-F]{24}$/;  
    return objectIdRegex.test(id);
};

  if (isValidObjectId(req.params.id)) {
  let data=await userService.deleteUser(req.params.id);
  if(data.deletedCount>0)
  res.send("user deleted successfully");
  else
  res.status(404).json("No data found");

  } else {
  res.status(400).json("Invalid Id Format");
  }
})

module.exports = userRoute;