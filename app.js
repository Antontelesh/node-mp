import express from "express";
import cookieParser from "./middlewares/cookie-parser";
import bodyParser from "body-parser";
import router from "./routes";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser);
app.use("/api/", router);

export default app;
