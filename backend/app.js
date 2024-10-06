import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config({
	path: "./.env",
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import urlRouter from "./routes/url.route.js";
app.use("/", urlRouter);

export default app;
