import app from "./app";
import { prisma } from "./config/prisma";
import { config } from "./config";

const port = config.port;

async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to database");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

main();
