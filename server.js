require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_middleware/error-handler.js');
const fs = require('fs');
const path = require('path');
const swaggerConfig = require('./swagger');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/products', require('./product/product.routes'));
app.use('/orders', require('./order/order.routes'));
app.use('/reporting', require('./reporting/reporting.routes'));

swaggerConfig(app);

// global error handler
app.use(errorHandler);


// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));