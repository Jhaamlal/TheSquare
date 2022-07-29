import prisma, { Prisma } from "../prismaClient"
import { RequestHandler } from "express"
import { prismaError } from "../interface/interfaces"

// add friends

export const sendFriendRequest: RequestHandler<
  {},
  {},
  {
    friendship: Prisma.FriendshipCreateInput
    UsersId: Prisma.FriendshipAvgOrderByAggregateInput
    user: Prisma.UserCreateInput
  }
> = async (req, res, next) => {
  try {
    const { primaryid, secondryid } = req.body.UsersId
    if (primaryid != undefined && secondryid != undefined) {
      const friends = await prisma.friendship.create({
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
      })
      return res.send(friends)
    }
  } catch (error) {
    const typedError = error as prismaError
    return res.send(typedError.message)
  }
}

export const acceptFriendRequest: RequestHandler<
  {},
  {},
  {
    UsersId: Prisma.FriendshipUncheckedCreateInput
    // friend: Prisma.FriendshipCreateInput
  }
> = async (req, res, next) => {
  const { primaryid, secondryid } = req.body.UsersId
  if (primaryid == undefined && secondryid == undefined) {
    return res.send("Sorry Darling............. Id is undefined")
  }
  try {
    const isFriends = await prisma.friendship.findFirst({
      where: {
        primaryid: secondryid,
        secondryid: primaryid,
      },
    })
    if (isFriends == null) {
      return res.send("OH bhai sahab what are you doing")
    }
    console.log(isFriends)
    const noncompositeId = isFriends?.noncompositeId

    await prisma.friendship.update({
      where: {
        noncompositeId,
      },
      data: {
        status: true,
      },
    })
    await prisma.friendship.create({
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
    })
    return res.send("FriendRequest accepted")
  } catch (error) {
    const typedError = error as prismaError
    return res.send(typedError.message)
  }
}

export const getFriendships: RequestHandler<
  {},
  {},
  { friendship: Prisma.FriendshipCreateInput }
> = async (req, res, next) => {
  try {
    const friends = await prisma.friendship.findMany({
      where: {
        status: true,
      },
      include: {
        primaryUser: true,
        secondaryUser: true,
      },
    })
    return res.send(friends)
  } catch (error) {
    const typedError = error as prismaError
    return res.send(typedError.message)
  }
}
