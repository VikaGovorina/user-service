import bcrypt from "bcrypt";
import { prisma } from "../../prisma/client";
import { generateToken } from "../../utils/jwt";
import { LoginData, RegisterData } from "./auth.types";
import { HttpError } from "../../utils/http-error";

export const registerUser = async (data: RegisterData) => {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });

    if (existingUser) {
        // throw new Error("User already exists");
        throw new HttpError("User already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
        data: {
            fullName: data.fullName,
            birthDate: new Date(data.birthDate),
            email: data.email,
            password: hashedPassword,
        },
    });

    const token = generateToken({
        id: user.id,
        role: user.role,
    });

    const { password, ...userWithoutPassword } = user;

    return {
        user: userWithoutPassword,
        token,
    };
};

export const loginUser = async (data: LoginData) => {
    const user = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });

    if (!user) {
        // throw new Error("User not found");
        throw new HttpError("Invalid credentials", 401);
    }

    if (!user.isActive) {
        // throw new Error("User is blocked");
        throw new HttpError("User is blocked", 403);
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
        // throw new Error("Invalid password");
        throw new HttpError("Invalid password", 401);
    }

    const token = generateToken({
        id: user.id,
        role: user.role,
    });
    
    const { password: _, ...userWithoutPassword } = user;

    return {
        user: userWithoutPassword,
        token,
    };
};
