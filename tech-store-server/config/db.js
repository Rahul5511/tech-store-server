const mongoose = require("mongoose");
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
const MAX_TRIAL = 5;
const DELAY = 3000;

const dbConnection = async () => {
    let attempt = 0;
  try {
    await mongoose.connect(
      MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("DB connected successfully");
  } catch (error) {
    attempt += 1;
    console.log(`Error connecting to MongoDB (attempt ${attempt}):`, error.message);
    if(attempt >= MAX_TRIAL){
        console.log("Max retries reached. Could not connect to MongoDB.");
        process.exit(1)
    }else{
        console.log(`Retrying to connect in ${DELAY / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve,DELAY))
    }
  }
};

const closedbConnection =async () => {
  await mongoose.connection.close()
}

module.exports = {dbConnection,closedbConnection};
