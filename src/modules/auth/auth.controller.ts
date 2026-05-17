import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../../validators/auth.validator";
import { loginUser, registerUser } from "./auth.service";

export const register = async (req: Request, res: Response) => {
    const validatedData = registerSchema.parse(req.body);

    const result = await registerUser(validatedData);

    res.status(201).json(result);
};

export const login = async (req: Request, res: Response) => {
    const validatedData = loginSchema.parse(req.body);

    const result = await loginUser(validatedData);

    res.status(200).json(result);
};
