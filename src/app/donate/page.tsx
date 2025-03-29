import Image from "next/image";
import { Trophy, Heart } from "lucide-react";
import { Progress } from "@/components/generated/progress";
import { IDonor, DonorDatabase } from "@/data/donors";
import { useMemo } from "react";

interface IDonorExtended extends IDonor {
  total: number;
  currentTotal: number;
  previousTotal: number;
}

export default async function DonatePage() {
  const currentYear = 2025;

  const donors: IDonorExtended[] = useMemo(() => {
    return DonorDatabase.map((donor) => {
      const total = donor.trx.reduce((acc, trx) => acc + trx.amount, 0);

      const currentTotal = donor.trx
        .filter((trx) => trx.date >= `${currentYear}-01-01`)
        .reduce((acc, trx) => acc + trx.amount, 0);

      const previousTotal = total - currentTotal;

      return {
        ...donor,
        total,
        currentTotal,
        previousTotal,
      };
    });
  }, [currentYear]);

  const sortedDonors = useMemo(() => {
    return donors.sort((a, b) => {
      if (b.currentTotal === a.currentTotal) {
        return b.total - a.total;
      }
      return b.currentTotal - a.currentTotal;
    });
  }, [donors]);

  const total = donors.reduce((acc, donor) => acc + donor.total, 0);
  const currentTotal = donors.reduce(
    (acc, donor) => acc + donor.currentTotal,
    0
  );

  return (
    <main className="container mx-auto px-4 pb-20">
      {/* Monthly Goal Progress */}
      <GoalSection currentTotal={currentTotal} />

      {/* Donor Leaderboard */}
      <section>
        <div className="flex items-center justify-center mb-12">
          <div className="h-px bg-gray-800 flex-grow"></div>
          <h2 className="text-2xl md:text-3xl font-bold px-6">Supporters</h2>
          <div className="h-px bg-gray-800 flex-grow"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="py-3 px-4 text-left">Supporter</th>
                  <th className="py-3 px-4 text-right w-[100px]">2025</th>
                  <th className="py-3 px-4 text-right w-[100px]">Previously</th>
                </tr>
              </thead>
              <tbody>
                {sortedDonors.map((donor, index) => (
                  <tr key={index} className="border-t border-gray-800">
                    <td className="py-3 px-4 flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full overflow-hidden relative">
                        <Image
                          src={"/placeholder.svg"}
                          alt={donor.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span>{donor.name}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      $
                      {donor.currentTotal.toLocaleString("en-US", {
                        maximumFractionDigits: 0,
                      })}
                    </td>
                    <td className="py-3 px-4 text-right">
                      $
                      {donor.total.toLocaleString("en-US", {
                        maximumFractionDigits: 0,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-gray-800">
                  <td className="py-3 px-4 font-bold">Total</td>
                  <td className="py-3 px-4 text-right font-bold">
                    $
                    {currentTotal.toLocaleString("en-US", {
                      maximumFractionDigits: 0,
                    })}
                  </td>
                  <td className="py-3 px-4 text-right font-bold">
                    $
                    {total.toLocaleString("en-US", {
                      maximumFractionDigits: 0,
                    })}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

function GoalSection({ currentTotal }: { currentTotal: number }) {
  // Calculate percentage of  goal
  const totalGoal = 2000;
  const percentComplete = (currentTotal / totalGoal) * 100;

  return (
    <section className="mb-20 bg-gray-900 rounded-lg p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">2025's Funding Goal</h2>

      <p className="mb-4">
        While the majority of our team members generously volunteer their time,
        we would like to launch several new initiatives that require financial
        support. If you have found the Khmer Coders community valuable and would
        be interested in contributing, please consider supporting our estimated
        operational needs for this year.
      </p>

      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">Current</span>
          <span className="font-medium">
            ${currentTotal} of ${totalGoal}
          </span>
        </div>
        <Progress value={percentComplete} className="h-3 bg-gray-800">
          <div
            className="h-3 bg-yellow-500"
            style={{ width: `${percentComplete}%` }}
          />
        </Progress>
      </div>
    </section>
  );
}
