import { Router } from "express";
import {
  getAllItemsController,
  createItemController,
  getItemByIdController,
  updateItemController,
  deleteItemController,
} from "../controllers/item.controller";

const router = Router();

// Define the routes and associate them with the controllers
router.get("/api/items", getAllItemsController);
router.post("/api/items", createItemController);
router.get("/api/items/:id", getItemByIdController);
router.put("/api/items/:id", updateItemController);
router.delete("/api/items/:id", deleteItemController);

export default router;
