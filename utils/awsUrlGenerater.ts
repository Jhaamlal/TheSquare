import AWS from "aws-sdk"

import { v4 as uuidv4 } from "uuid"
const accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY

const region = "ap-south-1"
const bucketName = "ravi-test-buket"

const s3 = new AWS.S3({
  region: region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
})

export const generatePublicUploadUrl = async (
  extension: string,
  type: string
) => {
  const uniqueImageName = uuidv4()

  const params = {
    Bucket: bucketName,
    Key: `${uniqueImageName}${extension}`,
    Expires: 45,
    ContentType: type,
  }

  const url = await s3.getSignedUrlPromise("putObject", params)

  return {
    uploadUrl: url,
    key: uniqueImageName,
  }
}
