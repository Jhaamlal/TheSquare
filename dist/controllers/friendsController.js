"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFriendships = exports.acceptFriendRequest = exports.sendFriendRequest = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
// add friends
const sendFriendRequest = async (req, res, next) => {
    try {
        const { primaryid, secondryid } = req.body.UsersId;
        if (primaryid != undefined && secondryid != undefined) {
            const friends = await prismaClient_1.default.friendship.create({
                data: {
                    primaryUser: {
                        connect: {
                            id: +primaryid,
                        },
                    },
                    secondaryUser: {
                        connect: {
                            id: +secondryid,
                        },
                    },
                    status: false,
                },
            });
            return res.send(friends);
        }
    }
    catch (error) {
        const typedError = error;
        return res.send(typedError.message);
    }
};
exports.sendFriendRequest = sendFriendRequest;
const acceptFriendRequest = async (req, res, next) => {
    const { primaryid, secondryid } = req.body.UsersId;
    if (primaryid == undefined && secondryid == undefined) {
        return res.send("Sorry Darling............. Id is undefined");
    }
    try {
        const isFriends = await prismaClient_1.default.friendship.findFirst({
            where: {
                primaryid: secondryid,
                secondryid: primaryid,
            },
        });
        if (isFriends == null) {
            return res.send("OH bhai sahab what are you doing");
        }
        console.log(isFriends);
        const noncompositeId = isFriends?.noncompositeId;
        await prismaClient_1.default.friendship.update({
            where: {
                noncompositeId,
            },
            data: {
                status: true,
            },
        });
        await prismaClient_1.default.friendship.create({
            data: {
                primaryUser: {
                    connect: {
                        id: +primaryid,
                    },
                },
                secondaryUser: {
                    connect: {
                        id: +secondryid,
                    },
                },
                status: true,
            },
        });
        return res.send("FriendRequest accepted");
    }
    catch (error) {
        const typedError = error;
        return res.send(typedError.message);
    }
};
exports.acceptFriendRequest = acceptFriendRequest;
const getFriendships = async (req, res, next) => {
    try {
        const friends = await prismaClient_1.default.friendship.findMany({
            where: {
                status: true,
            },
            include: {
                primaryUser: true,
                secondaryUser: true,
            },
        });
        return res.send(friends);
    }
    catch (error) {
        const typedError = error;
        return res.send(typedError.message);
    }
};
exports.getFriendships = getFriendships;
//# sourceMappingURL=friendsController.js.map