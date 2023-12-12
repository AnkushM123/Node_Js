const express=require('express');
const cors=require('cors');
const swaggerUi=require('swagger-ui-express');
const app=express();
const service=require('./core/services')
const swaggerSpecs=require('./swagger');

app.use(cors());
app.use(express.json()); 
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpecs));

/**
 *  @swagger
 * /employee:
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

app.get("/employee",async(req,res)=>{
  const data=await service.getEmployee() ;
  res.send(data);
})


/**
 * @swagger
 * /employee/{id}:
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
 *         description: Successfully retrieved list of employees
 *       404:
 *         description: No employees found
 *       500:
 *         description: Internal server error
 *    
 */

app.get("/employee/:id",async (req,res)=>{
 const employee=await service.getEmployeeById(req.params.id);
 res.send(employee);

})

/**
 * @swagger
 * /create:
 *   post:
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
 *     produces:
 *         application/json
 *     responses:
 *       200:
 *         description: employee created successfully
 *       400:
 *         description: Bad request
 */

app.post("/create",async (req,res)=>{
     const data=await service.createEmployee(req.body);
     res.send(data); 
    
})

/**
 * @swagger
 *  /edit/{id}:
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
 *         application/json:
 *           schema:
 *             type: object 
 *             properties:
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

app.put("/edit/:id",async(req,res)=>{
     const data=await service.editEmployee(req.body,req.params.id);
      res.send(data)
})

/**
 * @swagger
 * /remove/{id}:
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

app.delete("/remove/:id",async(req,res)=>{
     await service.deleteEmployee(req.params.id);
  res.send("deleted succcessfully");

})

app.listen(3000,()=>console.log("server is running"));




