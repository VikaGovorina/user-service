
export interface RegisterData {
    fullName: string;
    birthDate: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface JwtPayload {
    id: string;
    role: "ADMIN" | "USER";
}