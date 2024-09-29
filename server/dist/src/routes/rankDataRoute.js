"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rankDataController_1 = require("../controllers/rankDataController");
const router = (0, express_1.Router)();
// Get data through the corresponding controller
router.get("/", rankDataController_1.getRankData);
exports.default = router;
