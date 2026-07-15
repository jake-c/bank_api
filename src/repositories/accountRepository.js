/*
 * Account Repository
 *
 * Purpose:
 * Performs direct database operations using the Account model.
 * It should not handle HTTP or banking rules.
 * Note: Account is like a manager for all the account documents. Master class for
 * any need.
 */

// Account will serve as the entire collection/table. 
const Account = require("../models/Account");

async function createAccount(accountData) {
    //All of these returns will return the mongoDB created object in json back to us.
    return Account.create(accountData);
}

async function findAllAccounts() {
    // No parameter find is basically just select * from Account
    return Account.find();
}

async function findAccountById(accountId) {
    return Account.findById(accountId);
}

async function updateAccountById(accountId, updates) {
    return Account.findByIdAndUpdate(
        accountId,
        updates,
        {
            new: true,
            runValidators: true
        }
    );
}

async function deleteAccountById(accountId) {
    return Account.findByIdAndDelete(accountId);
}

module.exports = {
    createAccount,
    findAllAccounts,
    findAccountById,
    updateAccountById,
    deleteAccountById
};