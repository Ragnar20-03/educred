import express, { Request, Response } from "express"
import cors from "cors"
import { PORT } from "./config/dotenv"



const app = express()


app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: "Server is ON"
    })
})

app.listen(PORT, () => {
    console.log("server started on port number : ", PORT);

})
