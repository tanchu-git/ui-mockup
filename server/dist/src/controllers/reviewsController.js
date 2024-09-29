"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviews = void 0;
const client_1 = require("@prisma/client");
// API request to db
const prisma = new client_1.PrismaClient();
const getReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get data relevant to active business ID
    const { businessId } = req.query;
    try {
        const reviews = yield prisma.reviews.findMany({
            where: {
                businessId: Number(businessId)
            },
            include: {
                Business: true
            }
        });
        res.json(reviews);
    }
    catch (error) {
        res.status(500).json({ message: `Error retrieving reviews: ${error.message}` });
    }
});
exports.getReviews = getReviews;
