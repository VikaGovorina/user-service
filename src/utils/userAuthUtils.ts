import { User } from "@prisma/client";
import { AuthRequest } from "../middleware/auth.middleware";
import { getUserById } from "../modules/users/users.service";
import { HttpError } from "./http-error";
import { UserResponseDto } from "../modules/users/users.types";

export const validateUserAccess = async (req: AuthRequest) => {
    const id = req.params.id as string;
    
    if (!req.user) {
        throw new HttpError("Unauthorized", 401);
    }

    const isAdmin = req.user.role === "ADMIN";
    const isOwner = req.user.id === id;

    if (!isAdmin && !isOwner) {
        throw new HttpError("Forbidden", 403);
    }

    const user = await getUserById(id);

    if (!user) {
        throw new HttpError("User not found", 404);
    }

    return user;
};

export const toUserResponseDto = (
    user: User
): UserResponseDto => {
    return {
        id: user.id,
        fullName: user.fullName,
        birthDate: user.birthDate,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
};