const { DataTypes } = require('sequelize');
const Order = require('../order/order.model');
const Product = require('../product/product.model');

module.exports = model;

function model(sequelize) {
    const attributes = {
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        hash: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'user', validate: { isIn: [['user', 'admin']] } }
    };

    const options = {
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {} }
        }
    };

    const User = sequelize.define('User', attributes, options);

    // Hook to automatically update the role if provided
    User.beforeCreate((user, options) => {
        if (user.role) {
            user.role = user.role.toLowerCase(); // Convert role to lowercase
        }
    });

    // Hook to automatically update the role if provided
    User.beforeUpdate((user, options) => {
        if (user.role) {
            user.role = user.role.toLowerCase(); // Convert role to lowercase
        }
    });


    return User;
}

