import express from "express"
import { router as educationRouter } from "./education";
import { router as detailRouter } from "./details";
import { router as achivementRouter } from "./achivement";
import { router as authRouter } from "./auth";
import { M_AuthMiddleware } from "../../middlewares/authMiddleware";
import { M_userMiddleware } from "../../middlewares/userMiddleware";

export const router = express.Router();

router.use('/auth', authRouter);
router.use('/detail', M_userMiddleware, detailRouter)
router.use('/education', M_userMiddleware, educationRouter)
router.use('/achivement', M_userMiddleware, achivementRouter)