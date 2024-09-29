import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

// API request to db
const prisma = new PrismaClient();

export const getReviews = async (
    req: Request,
    res: Response
): Promise<void> => {
    // Get data relevant to active business ID
    const {businessId} = req.query;

    try {
        const reviews = await prisma.reviews.findMany({
            where: {
                businessId: Number(businessId)
            },
            include: {
                Business: true
            }
        });
        res.json(reviews);
    } catch (error: any) {
        res.status(500).json({message: `Error retrieving reviews: ${error.message}`});
    }
}