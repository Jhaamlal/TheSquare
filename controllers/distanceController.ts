import prisma, { Prisma } from "../prismaClient"
import { RequestHandler } from "express"
import { prismaError } from "../interface/interfaces"

const distanceCalculator = (
  lat1: number,
  lat2: number,
  lon1: number,
  lon2: number
) => {
  lon1 = (lon1 * Math.PI) / 180
  lon2 = (lon2 * Math.PI) / 180
  lat1 = (lat1 * Math.PI) / 180
  lat2 = (lat2 * Math.PI) / 180

  let dlon = lon2 - lon1
  let dlat = lat2 - lat1
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2)

  let c = 2 * Math.asin(Math.sqrt(a))
  let r = 6371
  return c * r
}

export const getDistance: RequestHandler<
  { id: number },
  {},
  {
    location: Prisma.GeoLocationCreateInput
  }
> = async (req, res, next) => {
  try {
    const userId = +req.params.id
    const userLocation = await prisma.geoLocation.findFirst({
      where: {
        User: {
          some: {
            id: userId,
          },
        },
      },
    })

    const currentUserLat = userLocation?.lat
    const currentUserLon = userLocation?.lon
    if (currentUserLat == undefined || currentUserLon == undefined) {
      return
    }
    const allLocation = await prisma.geoLocation.findMany({
      include: {
        User: true,
      },
    })

    const userInsideArea = allLocation.map((item) => {
      if (item.id !== userLocation?.id) {
        let distanceBetween = distanceCalculator(
          currentUserLat,
          item.lat,
          currentUserLon,
          item.lon
        )
        console.log(distanceBetween)
        if (distanceBetween < 100) {
          return item.User
        }
      }
    })

    return res.send({ userInsideArea })
  } catch (error) {
    return res.send({ error })
  }
}
