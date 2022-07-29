"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePublicUploadUrl = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const uuid_1 = require("uuid");
const accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY;
const region = "ap-south-1";
const bucketName = "ravi-test-buket";
const s3 = new aws_sdk_1.default.S3({
    region: region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: "v4",
});
const generatePublicUploadUrl = async (extension, type) => {
    const uniqueImageName = (0, uuid_1.v4)();
    const params = {
        Bucket: bucketName,
        Key: `${uniqueImageName}${extension}`,
        Expires: 45,
        ContentType: type,
    };
    const url = await s3.getSignedUrlPromise("putObject", params);
    return {
        uploadUrl: url,
        key: uniqueImageName,
    };
};
exports.generatePublicUploadUrl = generatePublicUploadUrl;
//# sourceMappingURL=awsUrlGenerater.js.map