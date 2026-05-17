import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { blockUser, getUser, getUsers } from "./users.controller";
import { roleMiddleware } from "../../middleware/role.middleware";
import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();

router.get(
    "/",
    authMiddleware,
    roleMiddleware(["ADMIN"]),
    asyncHandler(getUsers)
);

router.get(
    "/:id",
    authMiddleware,
    asyncHandler(getUser)
);

router.patch(
    "/:id/block",
    authMiddleware,
    asyncHandler(blockUser)
);

export default router;