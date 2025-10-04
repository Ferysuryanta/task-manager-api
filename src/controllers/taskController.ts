import {Request, Response} from "express";
import {AuthRequest} from "../middleware/auth";
// @ts-ignore
import { taskService } from "../services/taskService";

export const taskController = {
    createTask: async (req: AuthRequest, res: Response) => {
        try {
            const task = await taskService.create(req.user.id, req.body);
            res.json(task);
        } catch (error: any) {
            res.status(400).json({message: (error as Error).message});
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const {taskId} = req.params;
            const {status} = req.body;
            const updated = await taskService.updateStatus(taskId, status);
            res.status(200).json(updated);
        } catch (error: any) {
            res.status(400).json({message: (error as Error).message});
        }
    },

    getTasks: async (req: AuthRequest, res: Response) => {
        try {
            const tasks = await taskService.getAll(req.user.id);
            res.json(tasks);
        } catch (error: any) {
            res.status(400).json({message: (error as Error).message});
        }
    },

    delete: async (req: Request, res: Response) => {
        try{
            const {taskId} = req.params;
            const deleted = await taskService.softDelete(taskId);
            res.status(200).json(deleted);
        } catch (error: any) {
            res.status(400).json({message: (error as Error).message});
        }
    }
};