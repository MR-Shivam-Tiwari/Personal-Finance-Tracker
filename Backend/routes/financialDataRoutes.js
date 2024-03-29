// routes/financialDataRoutes.js
const express = require('express');
const router = express.Router();
const FinancialData = require('../models/FinancialData');




router.post('/', async (req, res) => {
    try {
        const financialData = new FinancialData(req.body);
        await financialData.save();
        res.status(201).json(financialData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all financial data
router.get('/', async (req, res) => {
    try {
        const financialData = await FinancialData.find();
        res.json(financialData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/financial-history', async (req, res) => {
    try {
        const financialData = await FinancialData.find();
        let financialHistory = {};

        // Iterate through financial data to group entries by date
        financialData.forEach(data => {
            data.income.forEach(item => {
                const date = item.date.toISOString().split('T')[0]; // Convert to ISO string and extract date part
                const amount = item.amount;
                const category = item.category || 'Income'; // If category is not available, set to 'Unknown'

                if (!financialHistory[date]) {
                    financialHistory[date] = [];
                }
                financialHistory[date].push({ type: 'Income', amount, category });
            });
            data.expenses.forEach(item => {
                const date = item.date.toISOString().split('T')[0]; // Convert to ISO string and extract date part
                const amount = item.amount;
                const category = item.category || 'Expense'; // If category is not available, set to 'Unknown'

                if (!financialHistory[date]) {
                    financialHistory[date] = [];
                }
                financialHistory[date].push({ type: 'Expense', amount, category });
            });
            data.investments.forEach(item => {
                const date = item.date.toISOString().split('T')[0]; // Convert to ISO string and extract date part
                const amount = item.amount;
                const category = item.category || 'Investment';

                if (!financialHistory[date]) {
                    financialHistory[date] = [];
                }
                financialHistory[date].push({ type: 'Investment', amount, category });
            });
        });

        res.json({ financialHistory });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Calculate investment growth by date
router.get('/investment-growth', async (req, res) => {
    try {
        const financialData = await FinancialData.find();
        let investmentGrowthByDate = {};

        // Iterate through financial data to calculate total investments for each date
        financialData.forEach(data => {
            data.investments.forEach(investment => {
                const date = investment.date.toISOString().split('T')[0]; // Convert to ISO string and extract date part
                const amount = investment.amount;

                if (!investmentGrowthByDate[date]) {
                    investmentGrowthByDate[date] = 0;
                }
                investmentGrowthByDate[date] += amount;
            });
        });

        // Convert investmentGrowthByDate object to an array of key-value pairs
        const sortedInvestmentGrowth = Object.entries(investmentGrowthByDate)
            .sort((a, b) => new Date(a[0]) - new Date(b[0])); // Sort by date

        // Convert back to an object
        const sortedInvestmentGrowthObject = sortedInvestmentGrowth.reduce((acc, [date, amount]) => {
            acc[date] = amount;
            return acc;
        }, {});

        res.json({ investmentGrowthByDate: sortedInvestmentGrowthObject });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Calculate expenses breakdown by category
router.get('/expenses-breakdown', async (req, res) => {
    try {
        const financialData = await FinancialData.find();
        let categoryExpenses = {};

        // Iterate through financial data to calculate total expenses for each category
        financialData.forEach(data => {
            data.expenses.forEach(expense => {
                const category = expense.category;
                const amount = expense.amount;

                if (!categoryExpenses[category]) {
                    categoryExpenses[category] = 0;
                }
                categoryExpenses[category] += amount;
            });
        });

        res.json({ expensesBreakdown: categoryExpenses });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/expenses-category', async (req, res) => {
    try {
        const financialData = await FinancialData.find();
        const categoryExpenses = []; // Array to store individual expense details

        // Iterate through financial data to extract category, amount, type, and date
        financialData.forEach(data => {
            data.expenses.forEach(expense => {
                const category = expense.category;
                const amount = expense.amount;
                const date = expense.date; // Assuming 'date' property exists in expense object

                // Check if date exists before pushing to avoid potential errors
                if (date) {
                    categoryExpenses.push({ category, amount, type: 'Expense', date });
                }
            });
        });

        res.json({ expensesBreakdown: categoryExpenses }); // Return array of expense objects
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Calculate total investments
router.get('/total-investments', async (req, res) => {
    try {
        const financialData = await FinancialData.find();
        let totalInvestments = 0;
        financialData.forEach(data => {
            data.investments.forEach(item => {
                totalInvestments += item.amount;
            });
        });
        res.json({ totalInvestments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Calculate total expenses
router.get('/total-expenses', async (req, res) => {
    try {
        const financialData = await FinancialData.find();
        let totalExpenses = 0;
        financialData.forEach(data => {
            data.expenses.forEach(item => {
                totalExpenses += item.amount;
            });
        });
        res.json({ totalExpenses });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Calculate total income
router.get('/total-income', async (req, res) => {
    try {
        const financialData = await FinancialData.find();
        let totalIncome = 0;
        financialData.forEach(data => {
            data.income.forEach(item => {
                totalIncome += item.amount;
            });
        });
        res.json({ totalIncome });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
