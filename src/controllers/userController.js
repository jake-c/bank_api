/*
 * User Controller
 *
 * Purpose:
 * Handles HTTP requests and responses for users.
 */

const userService = require("../services/userService");

function sendError(res, error) {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal server error"
    });
}

async function createUser(req, res) {
    try {
        const user = await userService.createUser(req.body);
        return res.status(201).json(user);
    } catch (error) {
        return sendError(res, error);
    }
}

async function getAllUsers(req, res) {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        return sendError(res, error);
    }
}

async function getUserById(req, res) {
    try {
        const user = await userService.getUserById(req.params.id);
        return res.status(200).json(user);
    } catch (error) {
        return sendError(res, error);
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById
};