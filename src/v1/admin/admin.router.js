/** Admin Routes */

/** Imports */
const router = require("express").Router();
const adminController = require('./admin.controller');

class adminRoutes {

    constructor() {

        /** router */
        this.router = router;

        /** Initialize Routes */
        this.core();
    }

    /**
     * Initialize Routes
     */
    core() {

        /** Routes */
        this.router.post("/register",  adminController.register);
        this.router.get("/login",  adminController.login);
        this.router.get("/verify-account", adminController.verifyAccount)
     
    }

    getRouters() {
        return this.router;
    }
}


/** Exports */
module.exports = adminRoutes;