/** Customer Routes */

/** Imports */
const router = require("express").Router();
const customerController = require('./customer.controller');

class customerRoutes {

    constructor() {

        this.router = router;

        this.core();
    }

    core() {
        /** Routes */
        this.router.post("/register",  customerController.register);
        this.router.get("/login",  customerController.login);
        this.router.get("/verify-account", customerController.verifyAccount);
    }

    getRouters() {
        return this.router;
    }
}

/** Exports */
module.exports = customerRoutes;