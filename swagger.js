const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger_output_u.json'
const endpointsFiles = ['./index.js'];
swaggerAutogen(outputFile, endpointsFiles);