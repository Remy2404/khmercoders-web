const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// Generate a secure random string for BETTER_AUTH_SECRET
const generateSecret = () => {
  return crypto.randomBytes(32).toString("base64");
};

// Path to .env file
const envPath = path.join(__dirname, "..", ".env");

const updateEnvFile = () => {
  try {
    // Check if .env file already exists
    if (fs.existsSync(envPath)) {
      console.log(".env file already exists. Skipping creation.");
      return;
    }

    // Generate a new secret
    const newSecret = generateSecret();

    // Create the .env content with all required variables
    const envContent = `BETTER_AUTH_SECRET="${newSecret}"
BETTER_AUTH_URL=http://localhost:3000
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
`;

    // Write the content to .env file (only if it doesn't exist)
    fs.writeFileSync(envPath, envContent);
    console.log(".env file has been created with the required variables");
  } catch (error) {
    console.error("Error creating .env file:", error);
    process.exit(1);
  }
};

updateEnvFile();
