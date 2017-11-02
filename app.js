import express from "express";
import cookieParser from "./middlewares/cookie-parser";

const app = express();
app.use(cookieParser);

export default app;
