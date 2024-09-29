"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const businessController_1 = require("../controllers/businessController");
const router = (0, express_1.Router)();
// Get data through the corresponding controller
router.get("/", businessController_1.getBusiness);
// Post new data
router.post("/", businessController_1.createBusiness);
exports.default = router;
