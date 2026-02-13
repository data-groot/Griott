interface StatCardProps {
  label: string
  value: number
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-card p-6 transition-shadow duration-200 hover:shadow-card-hover focus-within:shadow-card-hover">
      <p className="text-caption font-medium uppercase tracking-wider text-gray-500">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">{value}</p>
    </div>
  )
}
