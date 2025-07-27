import dotevn from "dotenv"

dotevn.config();
export const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/educred"
export const PORT = process.env.PORT || 3000
export const JWT_SECRET = process.env.JWT_SECRET || "none"
export const APP_EMAIL = process.env.APP_EMAIL || "roshanpp20@gmail.com"
export const APP_PASS = process.env.APP_PASS || "tnwy kobx nrlx xsnb"
