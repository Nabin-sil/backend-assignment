const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'NodeJs Assignment API',
      version: '1.0.0',
      description: 'API endpoints for assignment',
    },
  servers:[
     {
      url: 'http://localhost:4000/'
     }  
  ]
},
  apis: ['./reporting/reporting.routes.js', "./users/users.controller.js", "./product/product.routes.js","./order/order.routes.js"], // Path to API routes
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
