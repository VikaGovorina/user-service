import bcrypt from "bcrypt";
import { prisma } from "../../prisma/client";
import { generateToken } from "../../utils/jwt";
import { AuthResponseDto, LoginData, RegisterData } from "./auth.types";
import { HttpError } from "../../utils/http-error";
import { toUserResponseDto } from "../../utils/userAuthUtils";

export const registerUser = async (data: RegisterData): Promise<AuthResponseDto> => {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });

    if (existingUser) {
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

    return {
        user: toUserResponseDto(user),
        token,
    };
};

export const loginUser = async (data: LoginData): Promise<AuthResponseDto> => {
    const user = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });

    if (!user) {
        throw new HttpError("Invalid credentials", 401);
    }

    if (!user.isActive) {
        throw new HttpError("User is blocked", 403);
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
        throw new HttpError("Invalid password", 401);
    }

    const token = generateToken({
        id: user.id,
        role: user.role,
    });
    
    return {
        user: toUserResponseDto(user),
        token,
    };
};
