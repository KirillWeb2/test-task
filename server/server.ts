import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { MessagesRouter } from "./routes/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5500;

app.use(cors());
app.use(express.json());
app.use("/api/messages", MessagesRouter);

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

async function start() {
  try {
    app.listen(port, () => {
      console.log(
        `⚡️[server]: Server is running at https://localhost:${port}`
      );
    });
  } catch (error) {
    console.log(error);
  }
}

start();
