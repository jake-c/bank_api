require("dotenv").config();

const app = require("./app");
const connectDatabase = require("./config/database");

const PORT = process.env.PORT || 3000;

require("dotenv").config();

//FIX THE DNS ISSUE
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

console.log("URI loaded:", Boolean(process.env.MONGODB_URI));
console.log("URI begins correctly:", process.env.MONGODB_URI?.startsWith("mongodb+srv://"));

async function startServer() {

    await connectDatabase();

    app.listen(PORT, () => {

        console.log(`Server running at http://localhost:${PORT}`);

    });

}

startServer();