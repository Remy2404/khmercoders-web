interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
}

interface StatsSectionProps {
  items: StatItem[];
}

export function StatsSection({ items }: StatsSectionProps) {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
          {items.map((item, index) => (
            <StatCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon, value, label }: StatItem) {
  return (
    <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-gray-900/60 to-gray-900/30 border border-gray-800/50 hover:border-yellow-500/40 transition-all duration-300 hover:-translate-y-1 shadow-2xl shadow-black/40">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10 flex items-start gap-6">
        <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 border border-yellow-500/20 shadow-inner shadow-yellow-500/10">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-3xl font-bold bg-gradient-to-b from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
            {value}
          </h3>
          <p className="text-lg text-gray-300 mt-3 font-medium tracking-tight">{label}</p>
        </div>
      </div>
      <div className="absolute inset-0 rounded-3xl border border-white/5 pointer-events-none" />
    </div>
  );
}
