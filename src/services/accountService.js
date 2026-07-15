/*
 * Account Service
 *
 * Purpose:
 * Enforces banking rules and coordinates repository operations.
 * It decides whether an operation should be allowed.
 */


//Require returns exactly what we set to module.exports in the other file.
const accountRepository = require("../repositories/accountRepository");
const transactionRepository = require("../repositories/transactionRepository");

function createServiceError(message, statusCode) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
}

async function createAccount(accountData) {
    const { userId, accountType } = accountData;

    if (!userId) {
        throw createServiceError("userId is required", 400);
    }

    if (!["CHECKING", "SAVINGS"].includes(accountType)) {
        throw createServiceError(
            "accountType must be CHECKING or SAVINGS",
            400
        );
    }

    return accountRepository.createAccount({
        userId,
        accountType,
        balance: 0
    });
}

async function getAllAccounts() {
    return accountRepository.findAllAccounts();
}

async function getAccountById(accountId) {
    const account = await accountRepository.findAccountById(accountId);

    if (!account) {
        throw createServiceError("Account not found", 404);
    }

    return account;
}

async function deposit(accountId, amount) {
    if (typeof amount !== "number" || amount <= 0) {
        throw createServiceError(
            "Deposit amount must be greater than zero",
            400
        );
    }

    const account = await getAccountById(accountId);

    const newBalance = account.balance + amount;

    const updatedAccount = await accountRepository.updateAccountById(accountId, {
        balance: newBalance
    });

    // Create a record in the transaction collection of every deposit, traced to account Id.
    /* IDEALLY, we would make the update to the account and the 
    creation of the transaction atomic events, so if for some reason
    createTransaction fails, we would roll back the update to account.
    */
    await transactionRepository.createTransaction({
        accountId,
        txn_type: "DEPOSIT",
        amount
    });

    // Return the updatedAccount back with the new balance field, so that the controller can
    // use the return of this method to throw it into json for res.
    return updatedAccount;
}

async function withdraw(accountId, amount) {
    if (typeof amount !== "number" || amount <= 0) {
        throw createServiceError(
            "Withdrawal amount must be greater than zero",
            400
        );
    }

    const account = await getAccountById(accountId);

    if (account.balance < amount) {
        throw createServiceError("Insufficient funds", 400);
    }

    const newBalance = account.balance - amount;

    const updatedAccount = await accountRepository.updateAccountById(accountId, {
        balance: newBalance
    });


    /* IDEALLY, we would make the update to the account and the 
    creation of the transaction atomic events, so if for some reason
    createTransaction fails, we would roll back the update to account.
    */
    await transactionRepository.createTransaction({
        accountId,
        txn_type: "WITHDRAWAL",
        amount
    });

    return updatedAccount;
}

async function deleteAccount(accountId) {
    const account = await accountRepository.deleteAccountById(accountId);

    if (!account) {
        throw createServiceError("Account not found", 404);
    }

    return account;
}

async function getTransactions(accountId) {
    const account = await accountRepository.findAccountById(accountId);

    if (!account) {
        throw createServiceError("Account not found", 404);
    }

    return transactionRepository.findTransactionsByAccountId(accountId);
   
}
module.exports = {
    createAccount,
    getAllAccounts,
    getAccountById,
    deposit,
    withdraw,
    deleteAccount,
    getTransactions
};
