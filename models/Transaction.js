const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'categories'
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

const Transaction = mongoose.model('transactions', TransactionSchema);
module.exports = Transaction;