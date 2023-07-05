const db = require('database/db');
const userModel = require('../users/user.model');
const productModel = require('../product/product.model');
const orderModel = require('../order/order.model');
const orderItemModel = require('../order/orderItem.model');

// Define the associations
userModel(db);
productModel(db);
orderModel(db);
orderItemModel(db);

// Define the associations between models
const { User, Product, Order, OrderItem } = db;

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });
