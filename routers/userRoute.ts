import { Router, Request } from "express"
import { Response, NextFunction } from "express-serve-static-core"
import { addUser, getUser } from "../controllers/userController"

const router = Router()

router.get("/user", getUser)
router.post("/user", addUser)

export default router
