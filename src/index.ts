import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import cors from "cors";
import userRouter from "./routes/userRoutes";

async function init() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: "http://localhost:5000/",
    })
  );
  app.use("/", (req, res) => {
    res.json("the server is up and running");
  });

  app.use("/api", userRouter);
  const httpServer = http.createServer(app);
  const PORT = process.env.PORT ?? 3000;

  httpServer.listen(PORT, () => {
    console.log(`${PORT} is running on localhost`);
  });
}

init();
