import { Router, Request } from "express"
import { Response, NextFunction } from "express-serve-static-core"
import {
  sendFriendRequest,
  getFriendships,
  acceptFriendRequest,
} from "../controllers/friendsController"

const router = Router()

router.post("/sendRequest", sendFriendRequest)
router.post("/acceptRequest", acceptFriendRequest)
router.get("/getFriendship", getFriendships)

export default router
