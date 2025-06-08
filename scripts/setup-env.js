const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// Generate a secure random string for BETTER_AUTH_SECRET
const generateSecret = () => {
  return crypto.randomBytes(32).toString("base64");
};

// Path to .env file
const envPath = path.join(__dirname, "..", ".env");

// Check if .env file exists
const updateEnvFile = () => {
  try {
    let envContent = "";

    // Read existing .env file if it exists
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, "utf8");
    }

    // Generate a new secret
    const newSecret = generateSecret();

    // Check if BETTER_AUTH_SECRET already exists in the file
    if (envContent.includes("BETTER_AUTH_SECRET=")) {
      // Replace existing BETTER_AUTH_SECRET
      envContent = envContent.replace(
        /BETTER_AUTH_SECRET=.*/,
        `BETTER_AUTH_SECRET="${newSecret}"`
      );
    } else {
      // Add BETTER_AUTH_SECRET to the end of the file
      if (envContent && !envContent.endsWith("\n")) {
        envContent += "\n";
      }
      envContent += `BETTER_AUTH_SECRET="${newSecret}"\n`;
    }

    // Write the updated content back to .env
    fs.writeFileSync(envPath, envContent);
    console.log("BETTER_AUTH_SECRET has been generated and added to .env file");
  } catch (error) {
    console.error("Error updating .env file:", error);
    process.exit(1);
  }
};

updateEnvFile();
