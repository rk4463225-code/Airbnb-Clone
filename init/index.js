const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
}

main().then(() => {
    console.log("connected to DB");
}).catch((err) => {
    console.log(err);
});

const initDB = async () => {
    await Listing.deleteMany({});
    
    // STEP 1: Pehle kisi bhi ek user ki ID copy karein (MongoDB Compass ya shell se)
    // STEP 2: Use yahan "PASTE_YOUR_USER_ID_HERE" ki jagah paste karein
    const ownerId = "67c306df9a1b2c3d4e5f6g7h"; // <-- Apni User ID yahan dalein

    // STEP 3: Har listing ke saath owner add karein
    const updatedData = initData.data.map((obj) => ({
        ...obj,
        owner: ownerId, // Sabhi listings ko ek owner assign hoga
    }));

    await Listing.insertMany(updatedData);
    console.log("Data was initialized with owners!");
};

initDB();
