import express, { Request, Response } from "express"
import cors from "cors"
import { PORT } from "./config/dotenv"

import { connect_mongo } from "./db/schema"
import { router as userRouter } from "./routes/user/user"
const app = express()
app.use(cors())
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
