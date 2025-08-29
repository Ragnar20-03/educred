import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { Account } from "../db/schema";
import { JWT_SECRET } from "../config/dotenv";

interface JwtPayload {
    aid: string;
    uid: string;
    iat: number; // or whatever other properties you have
}

export const M_userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Check for cookie presence and value

        console.log("response url is : ", req.originalUrl);

        const authHeader = req.headers.authorization;
        console.log("Authorization header is : ", authHeader);

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.log("heree");
            return res.status(401).json({ msg: "UnAuthorized Request !" });

        }

        const token = authHeader.split(" ")[1]; // Get token after "Bearer"
        console.log("token is : ", token);


        // Proceed with verification only if the cookie is present and has a value
        let verifiedToken = jwt.verify(token, JWT_SECRET) as JwtPayload;


        if (verifiedToken) {
            if (verifiedToken.aid && verifiedToken.uid) {
                let query = await Account.findOne({ _id: verifiedToken.aid })
                if (query) {


                    (req as any).aid = verifiedToken.aid;
                    (req as any).uid = verifiedToken.uid;

                    next();
                }
            } else {
                return res.status(401).json({ msg: "UnAuthorized Request !" });

            }
        } else {
            return res.status(401).json({ msg: "UnAuthorized Request !" });
        }
    } catch (error) {
        console.log("error is : ", error);
        if (error instanceof TokenExpiredError) {
            // Handle token expiration (e.g., refresh token)
            return res.status(401).json({ msg: "Your authorization token has expired. Please log in again." });
        } else {
            return res.status(500).json({
                msg: "Unauthorized Request !"
            });
        }
    }
}