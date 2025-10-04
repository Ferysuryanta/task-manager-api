import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const taskService = {
    create: async (userId: string, data: any) => {
        return prisma.task.create({
            data: { ...data, userId },
        });
    },

    getAll: async (userId: string) => {
        return prisma.task.findMany({ where: { userId } });
    },
};