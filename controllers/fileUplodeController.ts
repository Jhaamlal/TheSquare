import prisma, { Prisma } from "../prismaClient"
import { RequestHandler, Request } from "express"
import { generatePublicUploadUrl } from "../utils/awsUrlGenerater"
import { prismaError } from "../interface/interfaces"

export const fileUploadUrl: RequestHandler<
  {},
  {},
  {
    dummy: { extension: string; filetype: string }
  }
> = async (req, res, next) => {
  try {
    const { extension, filetype } = req.body.dummy
    const s3UrlData = await generatePublicUploadUrl(extension, filetype)
    return res.send({
      uploadUrl: s3UrlData.uploadUrl,
      key: s3UrlData.key,
    })
  } catch (error) {
    const typedError = error as prismaError
    return res.send(typedError.message)
  }
}
