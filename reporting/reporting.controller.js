// Import necessary modules and models
const express = require('express');
const { Op } = require('sequelize');
const { Order, OrderItem, Product } = require('../database/db');


// Route to retrieve total sales by day, week, or month
async function getSales(req, res, next) {
  try {
    const { period } = req.query;

    // Calculate the start and end dates based on the period
    let startDate, endDate;
    if (period === 'day') {
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date();
      endDate.setHours(23, 59, 59, 999);
    } else if (period === 'week') {
      startDate = new Date();
      startDate.setDate(startDate.getDate() - startDate.getDay());
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date();
      endDate.setDate(startDate.getDate() + 6);
      endDate.setHours(23, 59, 59, 999);
    } else if (period === 'month') {
      startDate = new Date();
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(0);
      endDate.setHours(23, 59, 59, 999);
    } else {
      return res.status(400).json({ message: 'Invalid period' });
    }

    // Fetch the total sales within the specified period
    const totalSales = await Order.sum('totalAmount', {
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    res.json({ totalSales });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Route to retrieve top-selling products
async function getTopSellingProducts(req, res, next) {
  try {
    const { limit = 10 } = req.query;

    // Fetch the top-selling products based on the number of sales
    const topSellingProducts = await Product.findAll({
      include: [
        {
          model: OrderItem,
          attributes: [],
        },
      ],
      attributes: [
        'id',
        'productName',
        'productPrice',
        [sequelize.literal('COUNT(`OrderItems`.`id`)'), 'salesCount'],
      ],
      group: ['Product.id'],
      order: [[sequelize.literal('salesCount'), 'DESC']],
      limit: parseInt(limit),
    });

    res.json({ topSellingProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Export the controller functions
module.exports = {
    getSales,
    getTopSellingProducts
  };
  
