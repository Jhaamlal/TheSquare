import { PrismaClient, Prisma } from "@prisma/client"
const prisma = new PrismaClient()

if (process.env.NODE_ENV! !== "production") {
  // logging
  // prisma.$on("query", (e) => {
  //   console.log("Query: " + e.query)
  //   // console.log("Params: " + e.params)
  //   console.log("Duration: " + e.duration + "ms")
  // })
}

export { Prisma }

export default prisma
