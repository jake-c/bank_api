/*
 * Account Repository
 *
 * Purpose:
 * Performs direct database operations using the Account model.
 * It should not handle HTTP or banking rules.
 */

const Account = require("../models/Account");

async function createAccount(accountData) {
    return Account.create(accountData);
}

async function findAllAccounts() {
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