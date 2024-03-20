import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/routes.js";
import cors from "cors";

//import adminRoutes from './routes/adminRoutes.js'
const app = express();

//cors
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

//This converts request body to json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//body parser(To view in postman)
app.use(bodyParser.json());

app.use("/", routes);

export default app;
