import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { getUserById } from "../modules/users/users.service";

export const validateUserAccess = async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const isAdmin = req.user.role === "ADMIN";
    const isOwner = req.user.id === id;

    if (!isAdmin && !isOwner) {
        return res.status(403).json({ message: "Forbidden" });
    }

    const user = await getUserById(id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return user;
};