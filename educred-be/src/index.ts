import express, { Request, Response } from "express"
import cors from "cors"
import { PORT } from "./config/dotenv"
import cookieParser from "cookie-parser"

import { connect_mongo } from "./db/schema"
import { router as userRouter } from "./routes/user/main"
const app = express()
app.use(cors({
    origin: function (origin, callback) {
        const allowedOriginPattern = /http:\/\/localhost:\d{4}|https:\/\/your-production-domain\.com|https:\/\/rhqx4pwf-5100\.inc1\.devtunnels\.ms/;

        if (!origin) return callback(null, true); // Allow requests without origin, e.g., curl, Postman

        if (allowedOriginPattern.test(origin)) {
            callback(null, true);  // Origin matches the pattern
        } else {
            callback(new Error('Not allowed by CORS'));  // Origin is not allowed
        }
    },
    credentials: true  // Allow credentials (cookies)
}));

app.use(cookieParser()); // Use cookie-parser here

app.use(express.json())

app.use('/api/v1/user', userRouter);


app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: "Server is ON"
    })
})

app.listen(PORT, async () => {
    console.log("server started on port number : ", PORT);
    await connect_mongo()
})