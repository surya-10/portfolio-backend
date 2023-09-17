import express from "express";
import { userrouter } from "./routes.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
let app = express();
app.use(cors());
app.use(express.json());
app.use("/", userrouter);

app.listen(8000, ()=>console.log("server connected"));