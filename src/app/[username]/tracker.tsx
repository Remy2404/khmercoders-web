"use client";
import { trackProfileVisitAction } from "@/actions/track";
import { useEffect } from "react";

export function ProfileTrackingComponent({ userId }: { userId: string }) {
  useEffect(() => {
    trackProfileVisitAction({ userId }).then().catch();
  }, [userId]);

  return null;
}
