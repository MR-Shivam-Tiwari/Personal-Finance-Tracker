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
// Assuming you have defined FinancialData model and imported it

router.get('/', async (req, res) => {
    try {
        // Extracting email from the request query
        const { email } = req.query;

        // If email is not provided in the query, send an error response
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Querying the database for financial data associated with the provided email
        const financialData = await FinancialData.find({ email });

        // Sending the financial data as response
        res.json(financialData);
    } catch (error) {
        // Sending an error response if there's an error during data fetching
        res.status(500).json({ message: error.message });
    }
});


router.get('/financial-history', async (req, res) => {
    try {
        const { email } = req.query;

        // Check if email is provided
        if (!email) {
            return res.status(400).json({ message: "Email parameter is required" });
        }

        // Find financial data by email
        const financialData = await FinancialData.find({ email });

        // If no financial data found for the email
        if (financialData.length === 0) {
            return res.status(404).json({ message: "No financial data found for the provided email" });
        }

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
            data.savings.forEach(item => {
                const date = item.date.toISOString().split('T')[0]; // Convert to ISO string and extract date part
                const amount = item.amount;
                const category = 'Savings'; // Savings category

                if (!financialHistory[date]) {
                    financialHistory[date] = [];
                }
                financialHistory[date].push({ type: 'Savings', amount, category });
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
        const { email } = req.query;

        // Check if email is provided
        if (!email) {
            return res.status(400).json({ message: "Email parameter is required" });
        }

        // Find financial data by email
        const financialData = await FinancialData.find({ email });

        // If no financial data found for the email
        if (financialData.length === 0) {
            return res.status(404).json({ message: "No financial data found for the provided email" });
        }

        let investmentGrowthByDate = {};

        // Iterate through financial data to calculate total investments for each date
        financialData.forEach(data => {
            data.investments.forEach(investment => {
                const date = investment.date.toISOString().split('T')[0]; // Convert to ISO string and extract date part
                const amount = investment.amount;
                const type = investment.type;

                if (!investmentGrowthByDate[date]) {
                    investmentGrowthByDate[date] = [];
                }
                investmentGrowthByDate[date].push({ amount, type });
            });
        });

        res.json({ investmentGrowthByDate });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// Calculate expenses breakdown by category
router.get('/expenses-breakdown', async (req, res) => {
    try {
        const email = req.query.email; // Extract email from query parameters
        const financialData = await FinancialData.find({ email: email }); // Filter financial data by email
        let categoryExpenses = {};

        // Iterate through filtered financial data to calculate total expenses for each category
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
        const { email } = req.query;

        // Check if email parameter exists
        if (!email) {
            return res.status(400).json({ message: "Email parameter is required" });
        }

        // Fetch financial data based on the provided email
        const financialData = await FinancialData.find({ email });

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
        const email = req.query.email; // Extract email from query parameters

        // Ensure email is provided
        if (!email) {
            return res.status(400).json({ message: "Email parameter is required" });
        }

        // Fetch financial data for the provided email
        const financialData = await FinancialData.find({ email });

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
        const email = req.query.email;
        if(!email){
            return res.status(400).json({message :"Email parameter is required"})
        }
        const financialData = await FinancialData.find({ email });
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
        const email = req.query.email;
        if(!email){
            return res.status(400).json({message :"Email parameter is required"})
        }
        const financialData = await FinancialData.find({ email });
     
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

router.get('/total-savings', async (req, res) => {
    try {
        const email = req.query.email;
        if (!email) {
            return res.status(400).json({ message: "Email parameter is required" });
        }
        const financialData = await FinancialData.find({ email });

        let totalSavings = 0;
        financialData.forEach(data => {
            data.savings.forEach(item => {
                totalSavings += item.amount; // Change 'item.savings' to 'item.amount'
            });
        });
        res.json({ totalSavings });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;
