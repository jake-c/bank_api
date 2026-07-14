/*
 * app.js
 *
 * Purpose:
 * Creates and configures the Express application.
 *
 * Responsibilities:
 * - Register middleware
 * - Register API routes
 * - Export the configured Express app
 *
 * This file DOES NOT start the server.
 * server.js is responsible for connecting to MongoDB
 * and calling app.listen().
 */

const express = require("express");
const cors = require("cors");

const accountRoutes = require("./routes/accountRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "OK"
    });
});

// Register API routes
app.use("/api/accounts", accountRoutes);
app.use("/api/users", userRoutes);

module.exports = app;