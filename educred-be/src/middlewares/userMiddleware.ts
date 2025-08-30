import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { Account } from "../db/schema";
import { JWT_SECRET } from "../config/dotenv";

interface JwtPayload {
    aid: string;
    uid: string;
    iat: number;
}

export const M_userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get the token from cookies
        const token = req.cookies['token'];
        if (!token) {
            return res.status(401).json({ msg: "Unauthorized: No token found in cookies." });
        }

        // Verify token
        const verifiedToken = jwt.verify(token, JWT_SECRET) as JwtPayload;

        // Check if verified token has the required fields
        if (!verifiedToken?.aid || !verifiedToken?.uid) {
            return res.status(401).json({ msg: "Unauthorized: Invalid token." });
        }

        // Check if account exists
        const account = await Account.findOne({ _id: verifiedToken.aid });
        // console.log("account founded or not from u_middleware : ", account)
        if (!account) {
            return res.status(401).json({ msg: "Unauthorized: Account not found." });
        }

        // Attach uid and aid to request object for downstream handlers
        (req as any).uid = verifiedToken.uid;
        (req as any).aid = verifiedToken.aid;

        next();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return res.status(401).json({ msg: "Token expired. Please log in again." });
        }
        console.error("Middleware error:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
};