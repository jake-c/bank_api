/*
 * Account Routes
 *
 * Purpose:
 * Maps account HTTP methods and URLs to controller functions.
 */

const express = require("express");
const accountController = require("../controllers/accountController");

const router = express.Router();

// POST /api/accounts
//Whenever a POST comes in matching the endpoint ending with api/accounts,
//Call create account with req and res. The HTTP json body.
router.post("/", accountController.createAccount);

// GET /api/accounts
router.get("/", accountController.getAllAccounts);

// GET /api/accounts/:id
router.get("/:id", accountController.getAccountById);

// POST /api/accounts/:id/deposit
router.post("/:id/deposit", accountController.deposit);

// POST /api/accounts/:id/withdraw
router.post("/:id/withdraw", accountController.withdraw);

// DELETE /api/accounts/:id
router.delete("/:id", accountController.deleteAccount);

// GET /api/accounts/:id/transactions
router.get("/:id/transactions", accountController.getTransactions);

module.exports = router; 