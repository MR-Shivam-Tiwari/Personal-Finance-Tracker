const mongoose = require('mongoose');

const financialDataSchema = new mongoose.Schema({
    income: [{
        amount: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    expenses: [{
        amount: {
            type: Number,
            required: true
        },
        category: String,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    investments: [{
        amount: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }]
});

module.exports = mongoose.model('FinancialData', financialDataSchema);
