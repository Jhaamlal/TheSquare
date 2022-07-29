"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const distanceController_1 = require("../controllers/distanceController");
const router = (0, express_1.Router)();
router.get("/:id", distanceController_1.getDistance);
exports.default = router;
//# sourceMappingURL=distaceRouter.js.map