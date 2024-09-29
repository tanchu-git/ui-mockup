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
exports.createBusiness = exports.getBusiness = void 0;
const client_1 = require("@prisma/client");
// API request to db
const prisma = new client_1.PrismaClient();
const getBusiness = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ownerId } = req.query;
    try {
        // Call the business schema and grab all data
        const business = yield prisma.business.findMany({
            where: {
                ownerId: Number(ownerId)
            },
            include: {
                User: true
            }
        });
        res.json(business);
    }
    catch (error) {
        res.status(500).json({ message: `Error retrieving businesses: ${error.message}` });
    }
});
exports.getBusiness = getBusiness;
const createBusiness = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ownerId, name, street, postcode, city, coordinate } = req.body;
    try {
        // Create new data in the business schema
        const newBusiness = yield prisma.business.create({
            data: {
                ownerId,
                name,
                street,
                postcode,
                city,
                coordinate
            }
        });
        res.status(201).json(newBusiness);
    }
    catch (error) {
        res.status(500).json({ message: `Error creating a business: ${error.message}` });
    }
});
exports.createBusiness = createBusiness;
