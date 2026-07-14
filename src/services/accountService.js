/*
 * Account Service
 *
 * Purpose:
 * Enforces banking rules and coordinates repository operations.
 * It decides whether an operation should be allowed.
 */

const accountRepository = require("../repositories/accountRepository");

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

    return accountRepository.updateAccountById(accountId, {
        balance: newBalance
    });
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

    return accountRepository.updateAccountById(accountId, {
        balance: newBalance
    });
}

async function deleteAccount(accountId) {
    const account = await accountRepository.deleteAccountById(accountId);

    if (!account) {
        throw createServiceError("Account not found", 404);
    }

    return account;
}

module.exports = {
    createAccount,
    getAllAccounts,
    getAccountById,
    deposit,
    withdraw,
    deleteAccount
};
