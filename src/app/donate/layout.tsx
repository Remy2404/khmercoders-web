import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Support Us | Khmer Coders",
  description:
    "Support Khmer Coders through donations to help us organize events, provide resources, and grow the tech community in Cambodia.",
}

export default function DonateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

