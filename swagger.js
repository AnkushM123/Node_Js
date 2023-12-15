const swaggerJSDoc = require('swagger-jsdoc');

const options = {
   definition: {
      openapi: '3.0.0',
      info: {
         title: 'Node JS',
         version: '1.0.0'
      },
      servers: [
         {
            url: 'http://localhost:3000'
         }
      ]
   },
   apis: ['./apis/*']
}

const swaggerSpecs = swaggerJSDoc(options)

module.exports = swaggerSpecs;