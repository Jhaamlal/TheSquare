"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.getUser = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
const getUser = async (req, res, next) => {
    try {
        const user = await prismaClient_1.default.user.findMany({
            include: {
                secondaryUser: true,
                primaryUser: true,
            },
        });
        return res.send(user);
    }
    catch (error) {
        const typedError = error;
        return res.send(typedError.message);
    }
};
exports.getUser = getUser;
const addUser = async (req, res, next) => {
    try {
        const { name, email, gender, status } = req.body.user;
        const address = req.body.address;
        const location = req.body.location;
        const createData = {
            name,
            email,
            gender,
            status,
            address: { create: address },
            location: { create: location },
        };
        const createUser = await prismaClient_1.default.user.create({
            data: createData,
        });
        return res.send(createUser);
    }
    catch (error) {
        const typedError = error;
        return res.send(typedError.message);
    }
};
exports.addUser = addUser;
//Cost geoLocation
const addGolocation = async (req, res, next) => {
    try {
        const { id } = req.body.user;
        if (id == undefined) {
            return;
        }
        const updateGeolocation = await prismaClient_1.default.geoLocation.create({
            data: {
                User: {
                    connect: {
                        id: +id,
                    },
                },
                ...req.body.userGeo,
            },
        });
        return res.send("Geolocation Updated");
    }
    catch (error) {
        const typedError = error;
        return res.send(typedError.message);
    }
};
//# sourceMappingURL=userController.js.map