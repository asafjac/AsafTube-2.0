import express from "express";
import { env } from "process";
import { videosRouter } from "./routes/videos";
import bodyParser from "body-parser";
import postgres from "postgres";
import cors from "cors";

const app = express();
const port = env.PORT;
export const sql = postgres(env.DATABASE_URL as string, { ssl: "verify-full" });

app.use(cors());
app.use(bodyParser.json());

app.get("/isalive", (req, res) => {
  res.send(env.TEST);
  // res.send(Date.now().toString());
});

app.use("/videos", videosRouter);

app.listen(port, () => {
  console.log(`AsafTube app listening on port ${port}`);
});
