import { prisma } from "../../prisma/client";

export const getAllUsers = async () => {
    return prisma.user.findMany({
        select: {
            id: true,
            fullName: true,
            birthDate: true,
            email: true,
            role: true,
            isActive: true,
            createdAt: true,
        }
    });
};

export const getUserById = async (id: string) => {
    return prisma.user.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            fullName: true,
            birthDate: true,
            email: true,
            role: true,
            isActive: true,
            createdAt: true,
        }
    });
};

export const blockUserById = async (id: string) => {
    return prisma.user.update({
        where: {
            id,
        },
        data: {
            isActive: false,
        },
        select: {
            id: true,
            fullName: true,
            birthDate: true,
            email: true,
            role: true,
            isActive: true,
            createdAt: true,
        }
    });
};