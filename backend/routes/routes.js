import express from "express";
import {
  testApi,
  fetchData,
  fetchSpecificData,
  fetchSpecificDataByPeriod
} from "../controllers/controllers.js";

const router = express.Router();

router.route("/test").get(testApi);
router.route("/tickers").get(fetchData);
router.route("/ticker").get(fetchSpecificData);
router.route("/id").get(fetchSpecificDataByPeriod);

export default router;
