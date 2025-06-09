const { execSync } = require("child_process");

console.log("-> Setting up environment variables");
execSync("node ./scripts/setup-env.js", { encoding: "utf-8" });

console.log("-> Cleaning up database");
execSync("npm run db:clean", { encoding: "utf-8" });

console.log("-> Migrating database");
execSync("npm run db:migrate", { encoding: "utf-8" });
execSync("npm run db:chatbot:schema", { encoding: "utf-8" });

console.log("-> Create dummy data");
execSync("npm run db:seed", { encoding: "utf-8" });
execSync("npm run db:chatbot:seed", { encoding: "utf-8" });
