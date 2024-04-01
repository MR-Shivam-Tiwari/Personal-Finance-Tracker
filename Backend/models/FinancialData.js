const mongoose = require('mongoose');

const financialDataSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    income: {
        type: [{
            amount: {
                type: Number,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }],
        default: []
    },
    savings: {
        type: [{
            amount: {
                type: Number,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }],
        default: []
    },
    expenses: {
        type: [{
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
        default: []
    },
    investments: {
        type: [{
            amount: {
                type: Number,
                required: true
            },
            type: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }],
        default: []
    }
});


module.exports = mongoose.model('FinancialData', financialDataSchema);
