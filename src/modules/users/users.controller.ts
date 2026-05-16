import { Response } from "express";
import { blockUserById, getAllUsers, getUserById } from "./users.service";
import { AuthRequest } from "../../middleware/auth.middleware";
import { validateUserAccess } from "../../utils/userAuthUtils";


export const getUsers = async (req: AuthRequest, res: Response) => {
    try {
        const users = await getAllUsers();

        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : "Getting all users error",
        });
    }
};

export const getUser = async (req: AuthRequest, res: Response) => {
    try {
        const user = await validateUserAccess(req, res);

        if (!user) {
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : "Getting user error",
        });
    }
};

export const blockUser = async (req: AuthRequest, res: Response) => {
    try {
        const id = req.params.id as string;
        const user = await validateUserAccess(req, res);

        if (!user) {
            return;
        }

        const blockedUser = await blockUserById(id);

        res.status(200).json({
            message: "User blocked successfully",
            user: blockedUser
        });
    } catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : "Blocking user error",
        });
    }
};