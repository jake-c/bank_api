/*
 * Account Controller
 *
 * Purpose:
 * Handles HTTP requests and responses for account endpoints.
 * It extracts request data, calls the service, and returns JSON.
 */

const accountService = require("../services/accountService");

function sendError(res, error) {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal server error"
    });
}

async function createAccount(req, res) {
    try {
        const account = await accountService.createAccount(req.body);
        return res.status(201).json(account);
    } catch (error) {
        return sendError(res, error);
    }
}

async function getAllAccounts(req, res) {
    try {
        const accounts = await accountService.getAllAccounts();
        return res.status(200).json(accounts);
    } catch (error) {
        return sendError(res, error);
    }
}

async function getAccountById(req, res) {
    try {
        const account = await accountService.getAccountById(req.params.id);
        return res.status(200).json(account);
    } catch (error) {
        return sendError(res, error);
    }
}

async function deposit(req, res) {
    try {
        const account = await accountService.deposit(
            req.params.id,
            req.body.amount
        );

        return res.status(200).json(account);
    } catch (error) {
        return sendError(res, error);
    }
}

async function withdraw(req, res) {
    try {
        const account = await accountService.withdraw(
            req.params.id,
            req.body.amount
        );

        return res.status(200).json(account);
    } catch (error) {
        return sendError(res, error);
    }
}

async function deleteAccount(req, res) {
    try {
        const account = await accountService.deleteAccount(req.params.id);

        return res.status(200).json({
            message: "Account deleted",
            account
        });
    } catch (error) {
        return sendError(res, error);
    }
}

module.exports = {
    createAccount,
    getAllAccounts,
    getAccountById,
    deposit,
    withdraw,
    deleteAccount
};