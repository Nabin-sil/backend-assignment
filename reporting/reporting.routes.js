// Import necessary modules and models
const express = require('express');
const reportingController = require('./reporting.controller');

const router = express.Router();

// Route to retrieve total sales by day, week, or month
router.get('/sales', reportingController.getSales)

// Route to retrieve top-selling products
router.get('/top-selling-products', reportingController.getTopSellingProducts)


module.exports = router;



/**
 * @swagger
 * /reports/sales:
 *   get:
 *     summary: Get total sales by day, week, or month
 *     tags: [Reporting]
 *     parameters:
 *       - in: query
 *         name: period
 *         required: true
 *         schema:
 *           type: string
 *         description: The period for the sales report (day, week, or month)
 *     responses:
 *       '200':
 *         description: Successful retrieval of total sales
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalSales:
 *                   type: number
 */

