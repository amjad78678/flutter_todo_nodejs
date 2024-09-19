import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import cors from "cors";
import userRouter from "./routes/userRoutes";
import { globalErrorHandler } from "./config/globalErrorHandler";

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

  const httpServer = http.createServer(app);
  const PORT = process.env.PORT ?? 3000;

  httpServer.listen(PORT, () => {
    console.log(`${PORT} is running on localhost`);
  });
}

init();
