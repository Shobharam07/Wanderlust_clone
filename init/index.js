const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connect to database");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initdata.data =initdata.data.map((obj) => ({ ...obj, owner: "66cc257b8d63985d7e5ad425" }));
  await Listing.insertMany(initdata.data);
  console.log("data was initialized");
};
initDB();
