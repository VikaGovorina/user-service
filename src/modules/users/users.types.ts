
export interface UserResponseDto {
    id: string;
    fullName: string;
    birthDate: Date;
    email: string;
    role: "ADMIN" | "USER";
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}