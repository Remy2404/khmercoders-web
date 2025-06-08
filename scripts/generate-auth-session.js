const auth = require("better-auth");
require("dotenv").config();

// Session ID to sign
const sessionId = "ses_01HQTG5BBRX3XY1JJVNN6CZ7ZN";

// Get the secret from environment variable
const secret = process.env.BETTER_AUTH_SECRET;

if (!secret) {
  console.error("Error: BETTER_AUTH_SECRET environment variable is not set");
  process.exit(1);
}

// Generate HMAC signature using SHA-256
// From better-auth, we need to sign the session token
const { createHMAC } = require("@better-auth/utils/hmac");

async function generateSessionToken() {
  // Sign the session ID with the secret using HMAC SHA-256
  const signature = await createHMAC("SHA-256", "base64urlnopad").sign(
    secret,
    sessionId
  );

  // Format as sessionId.signature as used by better-auth
  const signedToken = `${sessionId}.${signature}`;

  return signedToken;
}

// Generate the signed session token
generateSessionToken()
  .then((token) => {
    console.log("Generated session token:", token);
  })
  .catch((err) => {
    console.error("Error generating session token:", err);
    process.exit(1);
  });
