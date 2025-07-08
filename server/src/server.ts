import app from "./app";
import { prisma } from "./config/prisma";

const port = process.env.PORT || 3000;

async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to database");
    app.listen(port, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

main();
