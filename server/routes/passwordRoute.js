import { passwordController } from "../controller/passwordContoller.js";
import express from "express";

const router = express.Router();

router.get("/:id", passwordController.getPasswords);
router.post("/", passwordController.addPassword);
router.put("/", passwordController.updatePassword);
router.delete("/", passwordController.deletePassword);

export { router as passwordRouter };
