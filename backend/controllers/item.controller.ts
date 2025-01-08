import { Request, Response, NextFunction } from "express";
import { z } from "zod"; // Import Zod for validation
import {
  getAllItems,
  createItemService,
  getItemByIdService,
  updateItemService,
  deleteItemService,
} from "../services/item.service";

// Define Zod validation schema for creating and updating items
const createItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be greater than 0"),
});

const updateItemSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().min(0, "Price must be greater than 0").optional(),
});

// Controller to get all items
export const getAllItemsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const items = await getAllItems();
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
};

// Controller to create a new item
export const createItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate request body using Zod schema
    const validatedData = createItemSchema.parse(req.body);

    const newItem = await createItemService(validatedData);
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
};

// Controller to get item by ID
export const getItemByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const item = await getItemByIdService(Number(req.params.id));
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (err) {
    next(err);
  }
};

// Controller to update an item by ID
export const updateItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate request body using Zod schema
    const validatedData = updateItemSchema.parse(req.body);

    const updatedItem = await updateItemService(
      Number(req.params.id),
      validatedData
    );
    if (updatedItem) {
      res.status(200).json(updatedItem);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (err) {
    next(err);
  }
};

// Controller to delete an item by ID
export const deleteItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await deleteItemService(Number(req.params.id));
    if (result) {
      res.status(200).json({ message: "Item deleted successfully" });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (err) {
    next(err);
  }
};
