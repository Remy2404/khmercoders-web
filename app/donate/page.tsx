import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Trophy, Heart, DollarSign, Coffee } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DonatePage() {
  // Calculate percentage of monthly goal
  const monthlyGoal = 2000
  const currentAmount = 1350
  const percentComplete = (currentAmount / monthlyGoal) * 100

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="container mx-auto py-12 px-4">
        <Link href="/" className="inline-flex items-center text-sm text-gray-400 hover:text-yellow-500 mb-8">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Support Our Community</h1>
          <p className="text-xl text-gray-400">
            Your donations help us organize events, provide resources, and grow the tech community in Cambodia.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-20">
        {/* Monthly Goal Progress */}
        <section className="mb-20 bg-gray-900 rounded-lg p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Monthly Funding Goal</h2>

          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Current</span>
              <span className="font-medium">
                ${currentAmount} of ${monthlyGoal}
              </span>
            </div>
            <Progress value={percentComplete} className="h-3 bg-gray-800" indicatorClassName="bg-yellow-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-400 mb-1">Events</p>
              <p className="text-xl font-bold">$600 / month</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-400 mb-1">Resources</p>
              <p className="text-xl font-bold">$400 / month</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-400 mb-1">Infrastructure</p>
              <p className="text-xl font-bold">$1000 / month</p>
            </div>
          </div>

          <div className="text-center">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">Donate Now</Button>
          </div>
        </section>

        {/* Donation Options */}
        <section className="mb-20 max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-12">
            <div className="h-px bg-gray-800 flex-grow"></div>
            <h2 className="text-2xl md:text-3xl font-bold px-6">Ways to Support</h2>
            <div className="h-px bg-gray-800 flex-grow"></div>
          </div>

          <Tabs defaultValue="monthly" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="monthly">Monthly Support</TabsTrigger>
              <TabsTrigger value="onetime">One-time Donation</TabsTrigger>
            </TabsList>

            <TabsContent value="monthly" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <DonationTier
                  title="Community Supporter"
                  amount="$10"
                  period="monthly"
                  benefits={["Name on our website", "Access to community Discord", "Early event registration"]}
                  icon={<Coffee className="h-10 w-10 text-yellow-500" />}
                />

                <DonationTier
                  title="Tech Advocate"
                  amount="$25"
                  period="monthly"
                  benefits={[
                    "All Community Supporter benefits",
                    "Free entry to monthly workshops",
                    "Exclusive tech resources",
                  ]}
                  icon={<Heart className="h-10 w-10 text-yellow-500" />}
                  highlighted={true}
                />

                <DonationTier
                  title="Innovation Partner"
                  amount="$50"
                  period="monthly"
                  benefits={[
                    "All Tech Advocate benefits",
                    "Logo on our website",
                    "Mentorship opportunities",
                    "Priority event access",
                  ]}
                  icon={<Trophy className="h-10 w-10 text-yellow-500" />}
                />
              </div>
            </TabsContent>

            <TabsContent value="onetime" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <OneTimeDonation amount="$20" />
                <OneTimeDonation amount="$50" />
                <OneTimeDonation amount="$100" />
                <OneTimeDonation amount="Custom" />
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Donor Leaderboard */}
        <section>
          <div className="flex items-center justify-center mb-12">
            <div className="h-px bg-gray-800 flex-grow"></div>
            <h2 className="text-2xl md:text-3xl font-bold px-6">Top Supporters</h2>
            <div className="h-px bg-gray-800 flex-grow"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                Monthly Supporters
              </h3>
              <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="py-3 px-4 text-left">Supporter</th>
                      <th className="py-3 px-4 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyDonors.map((donor, index) => (
                      <tr key={index} className="border-t border-gray-800">
                        <td className="py-3 px-4 flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full overflow-hidden relative">
                            <Image
                              src={donor.avatar || "/placeholder.svg"}
                              alt={donor.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span>{donor.name}</span>
                        </td>
                        <td className="py-3 px-4 text-right">${donor.amount}/mo</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Heart className="h-5 w-5 text-yellow-500 mr-2" />
                Recent Donations
              </h3>
              <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="py-3 px-4 text-left">Supporter</th>
                      <th className="py-3 px-4 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentDonors.map((donor, index) => (
                      <tr key={index} className="border-t border-gray-800">
                        <td className="py-3 px-4 flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full overflow-hidden relative">
                            <Image
                              src={donor.avatar || "/placeholder.svg"}
                              alt={donor.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span>{donor.name}</span>
                        </td>
                        <td className="py-3 px-4 text-right">${donor.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Khmer Coders. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

// Donation Tier Component
function DonationTier({ title, amount, period, benefits, icon, highlighted = false }) {
  return (
    <div
      className={`rounded-lg p-6 flex flex-col h-full ${highlighted ? "bg-yellow-500/10 border border-yellow-500/30" : "bg-gray-900 border border-gray-800"}`}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-1">{title}</h3>
      <div className="mb-4">
        <span className="text-2xl font-bold">{amount}</span>
        <span className="text-gray-400 text-sm"> {period}</span>
      </div>
      <ul className="space-y-2 mb-6 flex-grow">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-yellow-500 text-lg leading-none">•</span>
            <span className="text-gray-300">{benefit}</span>
          </li>
        ))}
      </ul>
      <Button
        className={
          highlighted ? "bg-yellow-500 hover:bg-yellow-600 text-black mt-auto" : "bg-gray-800 hover:bg-gray-700 mt-auto"
        }
      >
        Select
      </Button>
    </div>
  )
}

// One-time Donation Component
function OneTimeDonation({ amount }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center hover:border-yellow-500/30 transition-colors cursor-pointer">
      <div className="flex justify-center mb-2">
        <DollarSign className="h-6 w-6 text-yellow-500" />
      </div>
      <p className="text-xl font-bold">{amount}</p>
    </div>
  )
}

// Sample Data
const monthlyDonors = [
  {
    name: "Sovann Tech",
    amount: 100,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Dara Penhchet",
    amount: 50,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Angkor Innovations",
    amount: 50,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Bopha Rith",
    amount: 25,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Makara Sok",
    amount: 25,
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

const recentDonors = [
  {
    name: "Channarith Ly",
    amount: 100,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Phnom Penh Devs",
    amount: 75,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Sokha Meas",
    amount: 50,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Theary Kim",
    amount: 30,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Veasna Pich",
    amount: 20,
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

