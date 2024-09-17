import express from "express";
import { refreshController } from "../controller/resfreshTokenController.js";
const router = express.Router();

router.get("/", refreshController.getRefreshToken);

export { router as refreshRouter };
