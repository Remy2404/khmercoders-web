import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Community Members | Khmer Coders",
  description: "Meet the influential members of Khmer Coders who are making an impact in Cambodia's tech ecosystem.",
}

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

