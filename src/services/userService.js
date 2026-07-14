/*
 * User Service
 *
 * Purpose:
 * Validates users and enforces user-related business rules.
 */

const userRepository = require("../repositories/userRepository");

function createServiceError(message, statusCode) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
}

async function createUser(userData) {
    const { name, email } = userData;

    if (!name || !email) {
        throw createServiceError("name and email are required", 400);
    }

    const existingUser = await userRepository.findUserByEmail(email);

    if (existingUser) {
        throw createServiceError(
            "A user with that email already exists",
            409
        );
    }

    return userRepository.createUser({
        name,
        email
    });
}

async function getAllUsers() {
    return userRepository.findAllUsers();
}

async function getUserById(userId) {
    const user = await userRepository.findUserById(userId);

    if (!user) {
        throw createServiceError("User not found", 404);
    }

    return user;
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById
};