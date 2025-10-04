import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const authService = {
    register: async ({email, password}: {email: string; password: string}) => {
        const hashed = await bcrypt.hash(password, 10);
        return prisma.user.create({
            data: {email, password: hashed},
        });
    },

    login: async ({email, password}: {email: string, password: string}) => {
        const user = await prisma.user.findUnique({where: {email: email}});
        if (!user) throw new Error("User not found");

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new Error("Invalid password");

        return jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET as string, {
            expiresIn: "1h",
        })
    },
};