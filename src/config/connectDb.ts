import mongoose from "mongoose";

async function connectDb() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Mongodb connected successfully");
    });
    connection.on("error", (err) => {
      console.log("Mongodb connection error :" + err);
      process.exit(1);
    });
  } catch (error) {
    console.log("Db connection error :" + error);
  }
}

export default connectDb;
