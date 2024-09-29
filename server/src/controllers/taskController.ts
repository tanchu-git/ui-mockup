import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const { businessId } = req.query;

  try {
    const tasks = await prisma.task.findMany({
      where: {
        businessId: Number(businessId),
      },
      include: {
        Business: true,
      },
    });
    res.json(tasks);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving tasks: ${error.message}` });
  }
}

export const createTask = async (
    req: Request,
    res: Response
): Promise<void> => {
    const {title, description, status, priority, tags, startDate, dueDate, businessId} = req.body;

    try {
        // Create new data in the business schema
        const newTask = await prisma.task.create({
            data: {
                title, description, status, priority, tags, startDate, dueDate, businessId
            }
        });
        res.status(201).json(newTask);
    } catch (error: any) {
        res.status(500).json({message: `Error creating a task: ${error.message}`});
    }
}