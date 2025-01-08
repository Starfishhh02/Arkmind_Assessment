import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import itemRoute from "./routes/item.route";
import { itemSchema } from "./src/schemas/item.schema"; // Import your Zod schema
import { z } from "zod";

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Validation middleware
const validateItem = (req: Request, res: Response, next: NextFunction) => {
  try {
    itemSchema.parse(req.body); // Validate request body with Zod
    next(); // Proceed to the next middleware/controller if validation passes
  } catch (err) {
    if (err instanceof z.ZodError) {
      // Make sure to check if it's a ZodError
      res.status(400).json({ error: "Invalid data", details: err.errors });
    } else {
      next(err); // Pass the error to the default error handler if not a Zod error
    }
  }
};

// Routes
app.use("/api/item", validateItem, itemRoute); // Apply validation to item routes

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
