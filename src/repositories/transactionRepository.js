const Transaction = require("../models/Transaction");

async function createTransaction(transactionData) {
    return Transaction.create(transactionData);
}

async function findTransactionsByAccountId(accountId) {
    return Transaction.find({
        accountId: accountId
    });
}

module.exports = {
    createTransaction,
    findTransactionsByAccountId
};
