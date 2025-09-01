import express from "express"
import { router as blockchainRouter } from "./solana/solana__"
import { router as educationRouter } from "./education";
import { router as detailRouter } from "./details";
import { router as achivementRouter } from "./achievement";
import { router as authRouter } from "./auth";
import { router as histroyRouter } from "./history";
import { M_userMiddleware } from "../../middlewares/userMiddleware";

export const router = express.Router();

router.use('/auth', authRouter);

// ------------------------------------------------------------------------------------------------------------------------

router.use('/detail', M_userMiddleware, detailRouter)
// ------------------------------------------------------------------------------------------------------------------------

router.use('/achievement', M_userMiddleware, achivementRouter)
// ------------------------------------------------------------------------------------------------------------------------

router.use('/education', M_userMiddleware, educationRouter)
// ------------------------------------------------------------------------------------------------------------------------

router.use('/histroy', histroyRouter)
// ------------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------------------------------
router.use('/transaction', blockchainRouter)
router.use('/hiii', (req, res) => {
    return res.json({
        msg: "hii"
    })
})
