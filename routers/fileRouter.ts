import { Router } from "express"
import { fileUploadUrl } from "../controllers/fileUplodeController"

const router = Router()

router.post("/docs", fileUploadUrl)

export default router
