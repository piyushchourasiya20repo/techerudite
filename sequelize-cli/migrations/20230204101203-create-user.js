'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            _isAdmin: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            _isActive: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            _token: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            _lastLogin: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            _createdAt: {
                allowNull: false,
                type: Sequelize.STRING,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('user');
    },
};
