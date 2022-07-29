import prisma, { Prisma } from "../prismaClient"
import { RequestHandler } from "express"
import { prismaError } from "../interface/interfaces"

export const getUser: RequestHandler<
  {},
  {},
  { user: Prisma.UserCreateInput }
> = async (req, res, next) => {
  try {
    const user = await prisma.user.findMany({
      include: {
        secondaryUser: true,
        primaryUser: true,
      },
    })
    return res.send(user)
  } catch (error) {
    const typedError = error as prismaError
    return res.send(typedError.message)
  }
}

export const addUser: RequestHandler<
  {},
  {},
  {
    user: Prisma.UserCreateWithoutPostsInput
    address: Prisma.AddressCreateInput
    location: Prisma.GeoLocationCreateWithoutUserInput
  }
> = async (req, res, next) => {
  try {
    const { name, email, gender, status } = req.body.user
    const address = req.body.address
    const location = req.body.location
    const createData = {
      name,
      email,
      gender,
      status,
      address: { create: address },
      location: { create: location },
    }
    const createUser = await prisma.user.create({
      data: createData,
    })
    return res.send(createUser)
  } catch (error) {
    const typedError = error as prismaError
    return res.send(typedError.message)
  }
}

//Cost geoLocation

const addGolocation: RequestHandler<
  {},
  {},
  {
    userGeo: Prisma.GeoLocationCreateInput
    user: Prisma.UserUncheckedUpdateWithoutSecondaryUserInput
  }
> = async (req, res, next) => {
  try {
    const { id } = req.body.user
    if (id == undefined) {
      return
    }
    const updateGeolocation = await prisma.geoLocation.create({
      data: {
        User: {
          connect: {
            id: +id,
          },
        },
        ...req.body.userGeo,
      },
    })
    return res.send("Geolocation Updated")
  } catch (error) {
    const typedError = error as prismaError
    return res.send(typedError.message)
  }
}
