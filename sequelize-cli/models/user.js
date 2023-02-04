'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    user.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize.INTEGER,
            },
            name: {
                type: sequelize.STRING,
            },
            email: {
                type: sequelize.STRING,
            },
            password: {
                type: sequelize.STRING,
            },
            _isAdmin: {
                allowNull: false,
                type: sequelize.INTEGER,
            },
            _isActive: {
                allowNull: false,
                type: sequelize.INTEGER,
            },
            _token: {
                allowNull: false,
                type: sequelize.STRING,
            },
            _lastLogin: {
                allowNull: false,
                type: sequelize.STRING,
            },
            _createdAt: {
                allowNull: false,
                type: sequelize.STRING,
            },
        },
        {
            sequelize,
            modelName: 'user',
        }
    );
    return user;
};
