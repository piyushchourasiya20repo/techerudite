/** Admin Controller */


/** Imports */
const sqlConnection = require('../../../db/sqlconnection');
const authValidation = require('./admin.validation');
const emailService = require('../services/email');
const config = require('config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');

class adminController {

    async register(req, res) {
        try {
            let { value, error } = authValidation.register(req.body)
            if (error) {
                return res.status(203).json({
                    code: 203,
                    message: "Validation Fail",
                    data: error.details[0].message
                });
            }
            const { name, email, password, password_confirmation } = req.body;
            if (password === password_confirmation) {
                let query = `SELECT * FROM user WHERE email = '${email}'`;
                let status = await sqlConnection(query);
                if (status.length != 0) {
                    return res.status(203).json({
                        code: 203,
                        message: "Email alredy exists .....!",
                    });
                }
            } else {
                return res.status(203).json({
                    code: 203,
                    message: "Password & Confirm Password not match .....!",
                });
            }

            const salt = await bcrypt.genSalt(10);
            const hassPassword = await bcrypt.hash(password, salt);
            const token = await jwt.sign({ email: email }, config.get('token.JWT_SECRET_KEY'), { expiresIn: '10d' });
            let query = `INSERT INTO user (name, password, email, _token, _createdAt, _isAdmin) VALUES ('${name}', '${hassPassword}', '${email}','${token}','${moment().format('MMMM Do YYYY, h:mm:ss a')}','1');`;
            await sqlConnection(query);
            await emailService.sendVerifyAccount(email, token);
            return res.status(200).json({
                code: 200,
                message: `Admin Register Successufully .....!`
            });
        } catch (error) {
            console.log('adminController register', error, '=====', error.message);
            return res.status(500).json(error);
        }
    }

    async verifyAccount(req, res) {
        try {
            const token = req.query.token
            await jwt.verify(token, config.get('token.JWT_SECRET_KEY'), function (err, decode) {
                if (err) {
                    return res.status(402).json({
                        code: 402,
                        message: (err.message == 'jwt expired') ? ('token expire') : (err.message)
                    });
                }
            });
            let query = `UPDATE user set _token = '', _isActive = 1 where _token = '${token}'`;
            await sqlConnection(query);
            return res.status(200).json({
                code: 200,
                message: `Account is activated`
            });
        }
        catch (error) {
            console.log('adminController verifyAccount', error, '=====', error.message);
            return res.status(500).json(error);
        }
    }

    async login(req, res) {
        const { email, password } = req.query
        let { value, error } = authValidation.login(req.query)
        if (error) {
            return res.status(203).json({
                code: 203,
                message: "Validation Fail",
                data: error
            });
        }
        let query1 = `SELECT id, name, email, password, _isAdmin, _isActive FROM user WHERE email='${email}'`;
        let user = await sqlConnection(query1);

        if (user.length == 0) {
            return res.status(203).json({
                code: 203,
                message: "Invalid Email or Password .....!",
            });
        } else if (user[0]._isActive == 0) {
            return res.status(203).json({
                code: 203,
                message: "Account is not active ....!",
            });
        } else if (user[0]._isAdmin == 0) {
            return res.status(203).json({
                code: 203,
                message: "You are not allowed to login from here ....!",
            });
        }

        const isMatch = await bcrypt.compare(password, user[0].password)
        if (!isMatch) {
            return res.status(203).json({
                code: 203,
                message: "Invalid Email or Password .....!",
            });
        }

        const token = await jwt.sign({ id: user[0].id }, config.get('token.JWT_SECRET_KEY'), { expiresIn: '1d' });

        let query2 = `UPDATE user set _lastLogin = '${moment().format('MMMM Do YYYY, h:mm:ss a')}' where email ='${email}'`;
        sqlConnection(query2);
        return res.status(200).json({
            code: 200,
            message: `Admin Login Successufully .....!`,
            email: email,
            token: token,
        });
    } catch(error) {
        console.log('adminController login', error, '=====', error.message);
        return res.status(500).json(error);
    }
}

/** Exports */
module.exports = new adminController();