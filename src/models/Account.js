const mongoose = require("mongoose");


//Setting up the account document schema. Every document looks like this
const accountSchema = new mongoose.Schema({
    userId: Number,
    accountType: String,
    balance: Number
});


//Now we can use this Account object to CRUD in the MongoDB collection.
const Account = mongoose.model("Account", accountSchema);

//Makes account object importable from any other file
module.exports = Account;