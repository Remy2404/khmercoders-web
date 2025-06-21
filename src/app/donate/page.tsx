import Avatar from 'boring-avatars';
import { Progress } from '@/components/generated/progress';
import { IDonor, DonorDatabase } from '@/data/donors';
import { useMemo } from 'react';

interface IDonorExtended extends IDonor {
  total: number;
  currentTotal: number;
  previousTotal: number;
}

export default function DonatePage() {
  const currentYear = 2025;

  const donors: IDonorExtended[] = useMemo(() => {
    return DonorDatabase.map(donor => {
      const total = donor.trx.reduce((acc, trx) => acc + trx.amount, 0);

      const currentTotal = donor.trx
        .filter(trx => trx.date >= `${currentYear}-01-01`)
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
  const currentTotal = donors.reduce((acc, donor) => acc + donor.currentTotal, 0);

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

                  <th className="py-3 px-4 text-right w-[100px]">Total</th>
                  <th className="py-3 px-4 text-right w-[100px]">Current</th>
                </tr>
              </thead>
              <tbody>
                {sortedDonors.map((donor, index) => (
                  <tr key={index} className="border-t border-gray-800">
                    <td className="py-3 px-4 flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full overflow-hidden relative">
                        <Avatar name={donor.name} variant="bauhaus" />
                      </div>
                      <span>{donor.name}</span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      $
                      {donor.total.toLocaleString('en-US', {
                        maximumFractionDigits: 0,
                      })}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {donor.currentTotal === 0
                        ? '--'
                        : '$' +
                          donor.currentTotal.toLocaleString('en-US', {
                            maximumFractionDigits: 0,
                          })}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-gray-800">
                  <td className="py-3 px-4 font-bold text-right">Total</td>
                  <td className="py-3 px-4 text-right font-bold">
                    $
                    {currentTotal.toLocaleString('en-US', {
                      maximumFractionDigits: 0,
                    })}
                  </td>
                  <td className="py-3 px-4 text-right font-bold">
                    $
                    {total.toLocaleString('en-US', {
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
  const totalGoal = 2500;
  const percentComplete = (currentTotal / totalGoal) * 100;

  return (
    <section className="mb-20 bg-gray-900 rounded-lg p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">{"2025's Funding Goal"}</h2>

      <p className="mb-8">
        While the majority of our team members generously volunteer their time, we would like to
        launch several new initiatives that require financial support. If you have found the Khmer
        Coders community valuable and would be interested in contributing, please consider
        supporting our estimated operational needs for this year.
      </p>

      <div className="mb-8">
        <div className="flex justify-between mb-4">
          <span className="text-gray-400 text-xl">Current</span>
          <span className="font-medium text-xl">
            ${currentTotal} of ${totalGoal}
          </span>
        </div>
        <Progress value={percentComplete} className="h-5 bg-gray-800">
          <div className="h-3 bg-yellow-500" style={{ width: `${percentComplete}%` }} />
        </Progress>

        <div className="mt-8 flex flex-col md:flex-row gap-8">
          <div className="max-w-[300px] p-4 bg-white border border-4 border-yellow-500 rounded-lg">
            <img src="/qrcode.svg" className="w-full" />
            <div className="text-center mt-2 text-black">
              <p className="font-bold text-lg">IN V. & SUM S. & VOR S.</p>
            </div>
          </div>

          <div className="flex-1 flex items-center">
            <p className="text-lg">
              Please scan the QR code with your preferred Cambodian banking application. Include
              your name in the transaction remarks to be recognized on our supporters list.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
