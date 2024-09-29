import { Router } from "express";
import { getRankData } from "../controllers/rankDataController";

const router = Router();

// Get data through the corresponding controller
router.get("/", getRankData);

export default router;