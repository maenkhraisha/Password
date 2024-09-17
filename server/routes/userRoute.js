import express from "express";
import { userController } from "../controller/userController.js";
const router = express.Router();

router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.get("/logout", userController.logout);

router.post("/resetPassword/:token", userController.resetPassword);

router.post("/forgetPassword", userController.forgetPassword);

export { router as userRouter };
