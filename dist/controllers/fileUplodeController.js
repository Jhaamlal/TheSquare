"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUploadUrl = void 0;
const awsUrlGenerater_1 = require("../utils/awsUrlGenerater");
const fileUploadUrl = async (req, res, next) => {
    try {
        const { extension, filetype } = req.body.dummy;
        const s3UrlData = await (0, awsUrlGenerater_1.generatePublicUploadUrl)(extension, filetype);
        return res.send({
            uploadUrl: s3UrlData.uploadUrl,
            key: s3UrlData.key,
        });
    }
    catch (error) {
        const typedError = error;
        return res.send(typedError.message);
    }
};
exports.fileUploadUrl = fileUploadUrl;
//# sourceMappingURL=fileUplodeController.js.map