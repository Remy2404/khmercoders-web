import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function MemberNotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4">Member Not Found</h1>
        <p className="text-gray-400 mb-8">
          We couldn't find the member profile you're looking for. They may have moved or the profile doesn't exist.
        </p>
        <Link href="/members">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Members
          </Button>
        </Link>
      </div>
    </div>
  )
}

