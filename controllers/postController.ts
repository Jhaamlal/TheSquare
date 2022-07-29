import { RequestHandler } from "express"
import prisma, { Prisma } from "../prismaClient"
import { prismaError } from "../interface/interfaces"

export const createPost: RequestHandler<
  { id: number },
  {},
  {
    posts: Prisma.PostUncheckedCreateInput
  }
> = async (req, res, next) => {
  try {
    const id = req.params.id
    const { title, mainPost, postImage } = req.body.posts
    const createdPost = await prisma.post.create({
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
    })
    return res.send(createdPost)
  } catch (error) {
    const typedError = error as prismaError
    return res.send(typedError.message)
  }
}

export const getPost: RequestHandler<
  { id: number },
  {},
  {
    friendship: Prisma.FriendshipCreateInput
    post: Prisma.PostCreateInput
  }
> = async (req, res, next) => {
  try {
    const id = +req.params.id
    const friendship = await prisma.friendship.findMany({
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
    })
    const arr = friendship?.map((item) => {
      if (item.primaryid == id) {
        return item.secondryid
      } else if (item.secondryid == id) {
        return item.primaryid
      }
    })
    if (arr === undefined) {
      return
    }
    const arr1 = [...new Set(arr)]

    if (arr1 !== undefined) {
      const getPost = await prisma.post.findMany({
        where: {
          userId: {
            in: arr1 as number[],
          },
        },
      })
      return res.send({ getPost })
    }
  } catch (error) {
    const typedError = error as prismaError
    return res.send(typedError.message)
  }
}

// Like on some post
export const updateLike: RequestHandler<
  {},
  {},
  {
    post: Prisma.PostUncheckedUpdateInput
  }
> = async (req, res, next) => {
  try {
    const { id } = req.body.post
    if (id == undefined) {
      return
    }
    await prisma.post.update({
      where: {
        id: +id,
      },
      data: {
        like: {
          increment: 1,
        },
      },
    })
    return res.send("Like updated")
  } catch (error) {
    const typedError = error as prismaError
    return res.send(typedError.message)
  }
}

// Comment
export const updateComment: RequestHandler<
  {},
  {},
  {
    post: Prisma.PostUncheckedCreateInput
    comment: Prisma.CommentUncheckedCreateInput
  }
> = async (req, res, next) => {
  try {
    const { id, comments, userId } = req.body.post
    if (id == undefined) {
      return
    }
    await prisma.comment.create({
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
    })
    return res.send("updated comment")
  } catch (error) {
    const typedError = error as prismaError
    return res.send(typedError.message)
  }
}
