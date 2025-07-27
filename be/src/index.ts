import express, { Request, Response } from "express"
import cors from "cors"
import { PORT } from "./config/dotenv"

import { connect_mongo } from "./db/schema"



const app = express()


app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: "Server is ONNNNN"
    })
})

app.listen(PORT, async () => {
    console.log("server started on port number : ", PORT);
    await connect_mongo()
})
