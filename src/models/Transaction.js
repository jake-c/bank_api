const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    accountId: String,
    txn_type: String,
    amount: Number,
}, {
    timestamps: true
});


//New transaction table/collection created
const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;