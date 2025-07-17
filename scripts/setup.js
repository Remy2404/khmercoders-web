const { execSync } = require("child_process");
// Console styling helpers using ANSI escape codes
const style = {
    bold: (text) => `\x1b[1m${text}\x1b[0m`,
    dim: (text) => `\x1b[2m${text}\x1b[0m`,
    green: (text) => `\x1b[32m${text}\x1b[0m`,
    reset: "\x1b[0m"
};

console.log(style.bold("\n🚀 Setting up environment"));
console.log(style.dim("  ├─ Configuring environment variables..."));
execSync("node ./scripts/setup-env.js", { encoding: "utf-8" });
console.log(style.green("  ├─ ✓ Environment variables configured"));

console.log(style.bold("\n🗄️  Preparing database"));
console.log(style.dim("  ├─ Cleaning database..."));
execSync("npm run db:clean", { encoding: "utf-8" });
console.log(style.green("  ├─ ✓ Database cleaned"));

console.log(style.dim("  ├─ Migrating database schema..."));
execSync("npm run db:migrate", { encoding: "utf-8" });
console.log(style.green("  ├─ ✓ Database migrations complete"));

console.log(style.dim("  ├─ Setting up chatbot schema..."));
execSync("npm run db:chatbot:schema", { encoding: "utf-8" });
console.log(style.green("  └─ ✓ Chatbot schema configured"));

console.log(style.bold("\n📊 Populating data"));
console.log(style.dim("  ├─ Creating seed data..."));
execSync("npm run db:seed", { encoding: "utf-8" });
console.log(style.green("  ├─ ✓ Base seed data created"));

console.log(style.dim("  ├─ Creating chatbot seed data..."));
execSync("npm run db:chatbot:seed", { encoding: "utf-8" });
console.log(style.green("  ├─ ✓ Chatbot seed data created"));

console.log(style.dim("  ├─ Creating article seed data..."));
execSync("npm run db:seed:article", { encoding: "utf-8" });
console.log(style.green("  └─ ✓ Article seed data created"));

console.log(style.bold + style.green("\n✅ Setup complete!\n") + style.reset);
