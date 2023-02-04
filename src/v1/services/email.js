/** Email Services */

/** Imports */

const nodemailer = require('nodemailer');
const config = require('config');

class email {

    constructor() {
        this.connect = nodemailer.createTransport({
            host: `${config.get('mail.host')}`,
            port: `${config.get('mail.port')}`,
            secure: `${config.get('mail.secure')}`,
            auth: {
                user: `${config.get('mail.auth.user')}`,
                pass: `${config.get('mail.auth.pass')}`
            }
        });
    }

    async sendVerifyAccount(to, token) {
        let transporter = this.connect;

        let mailOptions = {
            from: `${config.get('mailOptions.from')}`,
            to: `${to}`,
            subject: 'Account Verify',
            html: `Hello Welcome to demo </br></br>
               Click to verify account </br></br>
               <button href="${config.get('server.host_url')}/v1/admin/verify-account?token=${token}" target="_blank">verify</button>`
        };

        transporter.verify(function (error, success) {

            if (error) {
                console.log('sendVerifyAccount transporter.verify', error, '=====>', error.message);
            } else {
                console.log("Server is ready to take our messages");
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log('sendVerifyAccount transporter.sendMail', error, '=====>', error.message);
                    } 
                });
            }
        });
    }
}

/** Exports */
module.exports = new email('');