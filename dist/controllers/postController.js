"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateComment = exports.updateLike = exports.getPost = exports.createPost = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
const createPost = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { title, mainPost, postImage } = req.body.posts;
        const createdPost = await prismaClient_1.default.post.create({
            data: {
                title,
                mainPost,
                postImage,
                user: {
                    connect: {
                        id: +id,
                    },
                },
            },
        });
        return res.send(createdPost);
    }
    catch (error) {
        const typedError = error;
        return res.send(typedError.message);
    }
};
exports.createPost = createPost;
const getPost = async (req, res, next) => {
    try {
        const id = +req.params.id;
        const friendship = await prismaClient_1.default.friendship.findMany({
            where: {
                OR: [
                    {
                        primaryid: +id,
                    },
                    {
                        secondryid: +id,
                    },
                ],
                AND: [
                    {
                        status: true,
                    },
                ],
            },
            orderBy: {
            // has to put time stamp
            },
        });
        const arr = friendship?.map((item) => {
            if (item.primaryid == id) {
                return item.secondryid;
            }
            else if (item.secondryid == id) {
                return item.primaryid;
            }
        });
        if (arr === undefined) {
            return;
        }
        const arr1 = [...new Set(arr)];
        if (arr1 !== undefined) {
            const getPost = await prismaClient_1.default.post.findMany({
                where: {
                    userId: {
                        in: arr1,
                    },
                },
            });
            return res.send({ getPost });
        }
    }
    catch (error) {
        const typedError = error;
        return res.send(typedError.message);
    }
};
exports.getPost = getPost;
// Like on some post
const updateLike = async (req, res, next) => {
    try {
        const { id } = req.body.post;
        if (id == undefined) {
            return;
        }
        await prismaClient_1.default.post.update({
            where: {
                id: +id,
            },
            data: {
                like: {
                    increment: 1,
                },
            },
        });
        return res.send("Like updated");
    }
    catch (error) {
        const typedError = error;
        return res.send(typedError.message);
    }
};
exports.updateLike = updateLike;
// Comment
const updateComment = async (req, res, next) => {
    try {
        const { id, comments, userId } = req.body.post;
        if (id == undefined) {
            return;
        }
        await prismaClient_1.default.comment.create({
            data: {
                comment: comments,
                usercommnet: {
                    connect: {
                        id: +userId,
                    },
                },
                post: {
                    connect: {
                        id: +id,
                    },
                },
            },
        });
        return res.send("updated comment");
    }
    catch (error) {
        const typedError = error;
        return res.send(typedError.message);
    }
};
exports.updateComment = updateComment;
//# sourceMappingURL=postController.js.map