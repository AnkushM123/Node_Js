const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const employeeRoute = require('./routes/employeeRoute')
const userRoute = require('./routes/userRoute');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');
const registerRoute = require('./routes/registerRoute')
const loginRoute = require('./routes/loginRoute')


app.use(cors());
app.use(express.json());
app.use('/images', express.static('images'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use("/employee", employeeRoute);
app.use("/user", userRoute);
app.use("/register", registerRoute);
app.use("/login", loginRoute);



mongoose.connect("mongodb://localhost:27017/Employee")
  .then(async function () {
    app.listen(3000, () => console.log("server is running"));
    console.log("connect to db");
  })
  .catch((err) => console.log(err))





