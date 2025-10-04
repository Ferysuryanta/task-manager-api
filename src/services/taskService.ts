import { PrismaClient } from "@prisma/client";
import {format} from "date-fns";

const prisma = new PrismaClient();

export const taskService = {
    create: async (userId: string, data: any) => {
        const dueDate = new Date(data.dueDate);
        const dueDateStr = format(dueDate, "dd-MM-yyyy");
        return prisma.task.create({
            data: {
                title: data.title,
                description: data.description,
                dueDate,
                dueDateStr,
                userId: userId
            },
        });
    },

    getAll: async (userId: string) => {
        return prisma.task.findMany({ where: { userId } });
    },
};