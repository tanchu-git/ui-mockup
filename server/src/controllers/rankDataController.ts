import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

// API request to db
const prisma = new PrismaClient();

export const getRankData = async (
    req: Request,
    res: Response
): Promise<void> => {
    // Get data relevant to active business ID
    const {businessId} = req.query;

    try {
        // Call the business schema and grab all data
        const rankData = await prisma.rankData.findMany({
            where: {
                businessId: Number(businessId)
            },
            include: {
                Business: true
            }
        });
        res.json(rankData);
    } catch (error: any) {
        res.status(500).json({message: `Error retrieving ranking data: ${error.message}`});
    }
}