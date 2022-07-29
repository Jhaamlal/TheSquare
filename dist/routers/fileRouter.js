"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fileUplodeController_1 = require("../controllers/fileUplodeController");
const router = (0, express_1.Router)();
router.post("/docs", fileUplodeController_1.fileUploadUrl);
exports.default = router;
//# sourceMappingURL=fileRouter.js.map