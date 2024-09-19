import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log('iam mongouri',process.env.MONGODB_URI)
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );

    console.log(
      `MongoDB connected for this: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    const err: Error = error as Error;
    process.exit(1);
  }
};

export { connectDB };
