import { Router, Request } from "express"
import { Response, NextFunction } from "express-serve-static-core"
import { getDistance } from "../controllers/distanceController"

const router = Router()

router.get("/:id", getDistance)

export default router
