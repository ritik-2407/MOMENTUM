const mongoose = require('mongoose');

const uri = 'mongodb+srv://idfcnub_db_user:Ritik%402407@momentum.3r3gxpx.mongodb.net/';

async function run() {
    try {
        console.log("Attempting to connect to:", uri);
        await mongoose.connect(uri);
        console.log("Connected successfully!");
        process.exit(0);
    } catch (err) {
        console.error("Connection failed:");
        console.error(err);
        process.exit(1);
    }
}

run();
