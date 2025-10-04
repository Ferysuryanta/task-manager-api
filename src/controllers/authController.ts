import { Request, Response } from "express";
// @ts-ignore
import {authService} from "../services/authService";

export const register = async (req: Request, res: Response) => {
    try {
        const user = await authService.register(req.body);
        res.json(user);
    } catch (error : any) {
        res.status(400).json({message: error.message});
    }
};

export const login = async (req: Request, res: Response) => {

    try {
        const token = await authService.login(req.body);
        res.json({token});
    } catch (error : any) {
        res.status(400).json({message: error.message});
    }
};