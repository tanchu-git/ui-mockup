import { Router } from "express";
import { getReviews } from "../controllers/reviewsController";

const router = Router();

// Get data through the corresponding controller
router.get("/", getReviews);

export default router;