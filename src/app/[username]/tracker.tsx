"use client";
import { trackProfileVisitAction } from "@/actions/track";
import { useEffect } from "react";

export function ProfileTrackingComponent({ userId }: { userId: string }) {
  useEffect(() => {
    if (typeof window !== "undefined" && userId) {
      console.log("Tracking profile visit for user:", userId);
      trackProfileVisitAction({ userId, referrer: window.document.referrer })
        .then()
        .catch();
    }
  }, [userId]);

  return null;
}
