import { PrismaClient } from "@prisma/client";
import {format} from "date-fns";

const prisma = new PrismaClient();

export const taskService = {

    // Create a new task for a user
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

    // Update an existing task
    updateStatus: async (taskId: string, status: "Done" | "Success") => {
        const existingTask = await prisma.task.findUnique({
            where: { id: taskId },
        });
        if (!existingTask) {
            throw new Error(`Task with id ${taskId} not found`);
        }

        // Update the status
        return prisma.task.update({
            where: {id: taskId},
            data: {status},
        });
    },

    // Get all tasks for a user
    getAll: async (userId: string) => {
        return prisma.task.findMany({ where: { userId } });
    },

    // Delete a task by its ID
    softDelete: async (taskId: string) => {
        const existingTask = await prisma.task.findUnique({
            where: { id: taskId },
        });
        if (!existingTask) {
            throw new Error(`Task with id ${taskId} not found`);
        }

        // Soft delete by setting a deleted flag (assuming such a field exists)
        return prisma.task.update({
            where: {id: taskId},
            data: {status: "Deleted"},
        });
    },
};