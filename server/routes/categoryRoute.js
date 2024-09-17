import { categoryController } from "../controller/categoryContoller.js";

import express from "express";

const router = express.Router();

router.get("/:id", categoryController.getCategories);
router.post("/", categoryController.addCategory);
router.put("/", categoryController.updateCategory);
router.delete("/", categoryController.deleteCategory);

export { router as categoryRouter };
