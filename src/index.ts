import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import cors from "cors";
import userRouter from "./routes/userRoutes";
import { globalErrorHandler } from "./config/globalErrorHandler";
import { connectDB } from "./config/connectDb";

const port = process.env.PORT || 4000;

async function init() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    cors({
      origin: "*",
    })
  );

  app.use("/api", userRouter);
  app.use(globalErrorHandler);

  // Bind the server first
  const httpServer = http.createServer(app);
  httpServer.listen(port, async () => {
    console.log(`${port} is running on localhost`);

    // Now try to connect to the database
    try {
      await connectDB();
      console.log('Database connected successfully');
    } catch (err) {
      console.error('Error connecting to the database:', err);
      process.exit(1);  // Exit the process if the DB connection fails
    }
  });
}

init();

