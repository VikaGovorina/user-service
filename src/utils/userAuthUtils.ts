import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { getUserById } from "../modules/users/users.service";
import { HttpError } from "./http-error";

// export const validateUserAccess = async (req: AuthRequest, res: Response) => {
export const validateUserAccess = async (req: AuthRequest) => {
    const id = req.params.id as string;
    
    if (!req.user) {
        throw new HttpError("Unauthorized", 401);
        // return res.status(401).json({ message: "Unauthorized" });
    }

    const isAdmin = req.user.role === "ADMIN";
    const isOwner = req.user.id === id;

    if (!isAdmin && !isOwner) {
        throw new HttpError("Forbidden", 403);
        // return res.status(403).json({ message: "Forbidden" });
    }

    const user = await getUserById(id);

    if (!user) {
        throw new HttpError("User not found", 404);
        // return res.status(404).json({ message: "User not found" });
    }

    return user;
};