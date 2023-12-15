const express = require('express');
const swaggerUi = require('swagger-ui-express');
const userService = require('../core/services/user-service')
const swaggerSpecs = require('../swagger');
const userRoute = express.Router();


/**
 *  @swagger 
 * /user/getUser:
 *   get:
 *     description: Get a list of all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully retrieved list of users
 *       404:
 *         description: No users found
 *       500:
 *         description: Internal server error
 */

userRoute.get("/getUser", async (req, res) => {
    const data = await userService.getUser();
    res.send(data);
})


/**
* @swagger
* /user/getUser/{id}:
*   get:
*     description: Retrieve user from the server.
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
*         description: Successfully retrieved user
*       404:
*         description: No user found
*       500:
*         description: Internal server error
*    
*/

userRoute.get("/getUser/:id", async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    res.send(user);

})

/**
* @swagger
* /user/createUser:
*   post:
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

userRoute.post("/createUser", async (req, res) => {
    const data = await userService.createUser(req.body);
    res.send(data);

})

/**
* @swagger
*  /user/editUser/{id}:
*  put:
*     description: Update an existing user using its ID.
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

userRoute.put("/editUser/:id", async (req, res) => {
    const data = await userService.editUser(req.body, req.params.id);
    res.send(data)
})

/**
* @swagger
* /user/removeUser/{id}:
*  delete:
 *     description: delete an existing user using its ID.
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*          type: string
 *     responses:
*       '200':
*         description: user deleted successfully
*       '404':
*         description: user not found
*       '500':
*         description: Internal server error     
*/

userRoute.delete("/removeUser/:id", async (req, res) => {
    await userService.deleteUser(req.params.id);
    res.send("User deleted succcessfully");

})

module.exports = userRoute;