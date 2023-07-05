const db = require('database/db');

// Controller functions
async function createOrder(req, res, next) {
  try {
    const { userId, products, totalAmount } = req.body;

    const order = await db.Order.create({ totalAmount, UserId: userId });

    // Create order items
    const orderItems = await Promise.all(
      products.map(async (product) => {
        const { id, quantity } = product;
        const orderItem = await db.OrderItem.create({ OrderId: order.id, ProductId: id, quantity });
        return orderItem;
      })
    );

    order.dataValues.OrderItems = orderItems;

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
}

async function updateOrder(req, res, next) {
  try {
    const { id } = req.params;
    const order = await db.Order.findByPk(id, { include: db.OrderItem });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.update(req.body);
    res.json(order);
  } catch (error) {
    next(error);
  }
}

async function deleteOrder(req, res, next) {
  try {
    const { id } = req.params;
    const order = await db.Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.destroy();
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    next(error);
  }
}

async function getOrder(req, res, next) {
  try {
    const { id } = req.params;
    const order = await db.Order.findByPk(id, { include: db.OrderItem });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
}

async function getAllOrders(req, res, next) {
  try {
    const orders = await db.Order.findAll({ include: db.OrderItem });
    res.json(orders);
  } catch (error) {
    next(error);
  }
}

// Export the controller functions
module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrders,
};
