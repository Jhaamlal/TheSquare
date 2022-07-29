"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prisma = void 0;
const client_1 = require("@prisma/client");
Object.defineProperty(exports, "Prisma", { enumerable: true, get: function () { return client_1.Prisma; } });
const prisma = new client_1.PrismaClient();
if (process.env.NODE_ENV !== "production") {
    // logging
    // prisma.$on("query", (e) => {
    //   console.log("Query: " + e.query)
    //   // console.log("Params: " + e.params)
    //   console.log("Duration: " + e.duration + "ms")
    // })
}
exports.default = prisma;
//# sourceMappingURL=prismaClient.js.map