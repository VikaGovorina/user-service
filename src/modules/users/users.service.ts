import { prisma } from "../../prisma/client";
import { toUserResponseDto } from "../../utils/userAuthUtils";

export const getAllUsers = async () => {
    const users = await prisma.user.findMany();

    return users.map(toUserResponseDto);
};

export const getUserById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        },
    });

    if (!user) {
        return null;
    }

    return toUserResponseDto(user);
};

export const blockUserById = async (id: string) => {
    const user = await prisma.user.update({
        where: {
            id,
        },
        data: {
            isActive: false,
        },
    });

    return toUserResponseDto(user);
};