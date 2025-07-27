import express from "express"
import { router as authRouter } from "./auth";
export const router = express.Router();

router.use('/auth', authRouter);