// import dotenv from "dotenv"
// dotenv.config()
import "dotenv/config"
import express, {
  Express,
  Request,
  Response,
  ErrorRequestHandler,
} from "express"

const app: Express = express()
const port = process.env.PORT
// midddelwares
app.use(express.json())

// Routers import
import userRouter from "./routers/userRoute"
import friendRouter from "./routers/friendshipRoute"
import postRouter from "./routers/postRequest"
import distanceRouter from "./routers/distaceRouter"
import fileRouter from "./routers/fileRouter"
// Router imports

// Router connections
app.use("/posts", postRouter)
app.use("/friend", friendRouter)
app.use("/distance", distanceRouter)
app.use("/uploadUrl", fileRouter)
app.use("/", userRouter)

app.listen(port, () => {
  console.log(`Server is Running Beta  ${port}`)
})
