const { execSync } = require("child_process");
const fs = require("fs");

// Get all the tables in our main D1 database
execSync(
  'npx -y wrangler d1 execute khmercoders --command "SELECT * FROM sqlite_master;" --json > scripts/schema.json',
  { encoding: "utf-8" }
);

// Read the schema file
const schema = JSON.parse(fs.readFileSync("scripts/schema.json", "utf-8"))[0]
  .results;

// Filter the tables to only include those that are not views
const tables = schema.filter(
  (table) =>
    table.type === "table" &&
    !table.name.startsWith("sqlite_") &&
    !table.name.startsWith("__drizzle") &&
    !table.name.startsWith("_cf")
);

// Writing the schema to schema.sql
const schemaSql = tables.map((table) => table.sql).join(";\n\n");

// Create a SQL comment that will be placed at the top of the schema file
const comment = `-- This is automatically generate final schema.
-- This is useful for feeding to the AI and vibe-coding.
-- This can be generated using \`npm run generate:main-schema\`
-- 
-- Please do not manually modify it

`;

// Prepend the comment to the schema SQL
const schemaWithComment = comment + schemaSql + ";";

fs.writeFileSync("db/main/schema.sql", schemaWithComment, "utf-8");

// Clean up the temporary schema file
fs.unlinkSync("scripts/schema.json");
