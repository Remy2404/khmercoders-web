"use server";

import crypto from "crypto";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { headers } from "next/headers";

export async function trackProfileVisitAction({ userId }: { userId: string }) {
  const { cf, env } = getCloudflareContext();
  const headerContext = await headers();

  if (cf && headerContext && env.PROFILE_ANALYTICS) {
    const countryCode = cf.country;
    const deviceType = headerContext.get("cf-device-type") || "unknown";
    const path = headerContext.get("x-url") || "";
    const referer = headerContext.get("referer") || "";

    const ipAddress =
      headerContext.get("cf-connecting-ip") ||
      headerContext.get("x-forwarded-for") ||
      "unknown";

    const uniqueSessionId = crypto
      .createHash("sha1")
      .update(ipAddress)
      .digest("hex");

    env.PROFILE_ANALYTICS.writeDataPoint({
      indexes: [userId],
      blobs: [
        "pageview", // blob1, event type
        countryCode || "", // blob2
        deviceType, // blob3
        uniqueSessionId, // blob4
        referer, // blob5
        path, // blob6
      ],
    });
  }
}
