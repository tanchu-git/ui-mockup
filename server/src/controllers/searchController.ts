import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const search = async (req: Request, res: Response): Promise<void> => {
  const { query } = req.query;
  try {
    const rankData = await prisma.rankData.findMany({
        where: {
          OR: [
            { mostMentionedCompliment: { contains: query as string } },
            { mostMentionedComplaint: { contains: query as string } },
            { mostMentionedStaff: { contains: query as string } },
            { topSocialTool: { contains: query as string } },
            { bottomSocialTool: { contains: query as string } },
            { topReviewTool: { contains: query as string } },
            { bottomReviewTool: { contains: query as string } },
          ],
        },
      });

    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { title: { contains: query as string } },
          { description: { contains: query as string } },
          { priority: { contains: query as string } },
          { tags: { contains: query as string } },
        ],
      },
    });

    const projects = await prisma.business.findMany({
      where: {
        OR: [
          { name: { contains: query as string } },
          { street: { contains: query as string } },
          { city: { contains: query as string } },
        ],
      },
    });

    const users = await prisma.user.findMany({
      where: {
        OR: [{ username: { contains: query as string } }],
      },
    });    
    res.json({ rankData, tasks, projects, users });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error performing search: ${error.message}` });
  }
};