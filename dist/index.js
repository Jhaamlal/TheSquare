"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import dotenv from "dotenv"
// dotenv.config()
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT;
// midddelwares
app.use(express_1.default.json());
// Routers import
const userRoute_1 = __importDefault(require("./routers/userRoute"));
const friendshipRoute_1 = __importDefault(require("./routers/friendshipRoute"));
const postRequest_1 = __importDefault(require("./routers/postRequest"));
const distaceRouter_1 = __importDefault(require("./routers/distaceRouter"));
const fileRouter_1 = __importDefault(require("./routers/fileRouter"));
// Router imports
// Router connections
app.use("/posts", postRequest_1.default);
app.use("/friend", friendshipRoute_1.default);
app.use("/distance", distaceRouter_1.default);
app.use("/uploadUrl", fileRouter_1.default);
app.use("/", userRoute_1.default);
app.listen(port, () => {
    console.log(`Server is Running Beta  ${port}`);
});
//# sourceMappingURL=index.js.map