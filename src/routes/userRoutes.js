/*
 * User Routes
 *
 * Purpose:
 * Maps user URLs and HTTP methods to user controller functions.
 */

const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);

module.exports = router;