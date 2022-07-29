"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = require("../controllers/postController");
const router = (0, express_1.Router)();
router.post("/create/:id", postController_1.createPost);
router.post("/update/like", postController_1.updateLike);
router.post("/update/comment", postController_1.updateComment);
router.get("/getfriendspost/:id", postController_1.getPost);
exports.default = router;
//# sourceMappingURL=postRequest.js.map