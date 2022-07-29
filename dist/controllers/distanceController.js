"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDistance = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
const distanceCalculator = (lat1, lat2, lon1, lon2) => {
    lon1 = (lon1 * Math.PI) / 180;
    lon2 = (lon2 * Math.PI) / 180;
    lat1 = (lat1 * Math.PI) / 180;
    lat2 = (lat2 * Math.PI) / 180;
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
    let c = 2 * Math.asin(Math.sqrt(a));
    let r = 6371;
    return c * r;
};
const getDistance = async (req, res, next) => {
    try {
        const userId = +req.params.id;
        const userLocation = await prismaClient_1.default.geoLocation.findFirst({
            where: {
                User: {
                    some: {
                        id: userId,
                    },
                },
            },
        });
        const currentUserLat = userLocation?.lat;
        const currentUserLon = userLocation?.lon;
        if (currentUserLat == undefined || currentUserLon == undefined) {
            return;
        }
        const allLocation = await prismaClient_1.default.geoLocation.findMany({
            include: {
                User: true,
            },
        });
        const userInsideArea = allLocation.map((item) => {
            if (item.id !== userLocation?.id) {
                let distanceBetween = distanceCalculator(currentUserLat, item.lat, currentUserLon, item.lon);
                console.log(distanceBetween);
                if (distanceBetween < 100) {
                    return item.User;
                }
            }
        });
        return res.send({ userInsideArea });
    }
    catch (error) {
        return res.send({ error });
    }
};
exports.getDistance = getDistance;
//# sourceMappingURL=distanceController.js.map