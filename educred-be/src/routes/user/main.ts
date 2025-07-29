import express from "express"
import { router as educationRouter } from "./education";
import { router as detailRouter } from "./details";
import { router as achivementRouter } from "./achivement";
import { router as authRouter } from "./auth";

export const router = express.Router();

router.use('/auth', authRouter);
router.use('/detail', detailRouter)
router.use('/education', educationRouter)
router.use('/achivement', achivementRouter)