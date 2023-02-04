const mysql = require('mysql');
const util = require('util');
const config = require('config');

const connection = mysql.createConnection({
    host: `${config.get('dataBase.host')}`,
    user: `${config.get('dataBase.user')}`,
    password: `${config.get('dataBase.password')}`,
    database: `${config.get('dataBase.database')}`
});

connection.connect((err) => {
    if (err) {
        console.log('error while connecting SQL database' + err);
    }
});

connection.query = util.promisify(connection.query).bind(connection);

module.exports = connection.query;