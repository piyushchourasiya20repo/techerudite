const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const adminRoutes = require('./src/v1/admin/admin.router');
const customerRoutes = require('./src/v1/customer/customer.router');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use('/v1/admin', new adminRoutes().getRouters());
app.use('/v1/customer', new customerRoutes().getRouters());


module.exports = app;
