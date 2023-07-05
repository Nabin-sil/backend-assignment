const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('OrderItem', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
};
