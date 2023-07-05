const { DataTypes } = require('sequelize');
const User = require('../users/user.model');


module.exports = model;

function model(sequelize) {
    const attributes = {
        productName: { type: DataTypes.STRING, allowNull: false },
        productPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        image: { type: DataTypes.STRING, allowNull: false },
    };


    const Product = sequelize.define('Product', attributes);


    return Product;
}
