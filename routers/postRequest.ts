import { Request, Router } from "express"
import {
  createPost,
  getPost,
  updateComment,
  updateLike,
} from "../controllers/postController"
const router = Router()

router.post("/create/:id", createPost)
router.post("/update/like", updateLike)
router.post("/update/comment", updateComment)
router.get("/getfriendspost/:id", getPost)

export default router
