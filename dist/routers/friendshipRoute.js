"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const friendsController_1 = require("../controllers/friendsController");
const router = (0, express_1.Router)();
router.post("/sendRequest", friendsController_1.sendFriendRequest);
router.post("/acceptRequest", friendsController_1.acceptFriendRequest);
router.get("/getFriendship", friendsController_1.getFriendships);
exports.default = router;
//# sourceMappingURL=friendshipRoute.js.map