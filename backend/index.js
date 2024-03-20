import dotenv from "dotenv";
import app from "./app.js";
import { Sequelize } from "sequelize";

//Settings
dotenv.config({ path: "./config/config.env" });

//Listen to the port
app.listen(process.env.PORT, () => {
  console.log(`Server at port:${process.env.PORT} in mode ${process.env.MODE}`);
});
