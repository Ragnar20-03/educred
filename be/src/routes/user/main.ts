import express from "express"
import { router as authRouter } from "./auth";
import { router as userRouter } from "./user";
export const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter)