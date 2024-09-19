import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}${process.env.DATABASE_NAME}`
    );
  } catch (error) {
    const err: Error = error as Error;

    process.exit(1);
  }
};

export { connectDB };
