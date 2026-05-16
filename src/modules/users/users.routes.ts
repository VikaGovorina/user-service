import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { blockUser, getUser, getUsers } from "./users.controller";
import { roleMiddleware } from "../../middleware/role.middleware";

const router = Router();

router.get(
    "/",
    authMiddleware,
    roleMiddleware(["ADMIN"]),
    getUsers
);

router.get(
    "/:id",
    authMiddleware,
    getUser
);

router.patch(
    "/:id/block",
    authMiddleware,
    blockUser
);

export default router;