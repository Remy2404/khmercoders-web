import { trackProfileVisitAction } from "@/actions/track";
import { useEffect } from "react";

export function ProfileTrackingComponent({ userId }: { userId: string }) {
  "use client";

  useEffect(() => {
    trackProfileVisitAction({ userId }).then();
  }, [userId]);

  return null;
}
