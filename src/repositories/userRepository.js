/*
 * User Repository
 *
 * Purpose:
 * Performs direct user database operations.
 */

const User = require("../models/User");

async function createUser(userData) {
    return User.create(userData);
}

async function findAllUsers() {
    return User.find();
}

async function findUserById(userId) {
    return User.findById(userId);
}

async function findUserByEmail(email) {
    return User.findOne({ email });
}

module.exports = {
    createUser,
    findAllUsers,
    findUserById,
    findUserByEmail
};