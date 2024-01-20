import mongoose from "mongoose";

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const { MONGO_URI } = process.env;

// connection function
export const connectToDB = async () => {
  const conn = await mongoose
    .connect(MONGO_URI as string)
    .catch((err) => console.log(err));
  console.log("Mongoose Connection Established");

  return { conn };
};
