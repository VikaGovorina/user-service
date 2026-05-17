import bcrypt from "bcrypt";
import { prisma } from "../client";

async function seedAdmin() {
    const existingAdmin = await prisma.user.findUnique({
        where: {
            email: "admin@gmail.com",
        },
    });

    if (existingAdmin) {
        console.log("Admin already exists");
        return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await prisma.user.create({
        data: {
            fullName: "Admin",
            birthDate: new Date("2003-10-10"),
            email: "admin@gmail.com",
            password: hashedPassword,
            role: "ADMIN",
            isActive: true,
        },
    });

    console.log("Admin created successfully");
}

seedAdmin()
    .catch((error) => {
        console.error(error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });