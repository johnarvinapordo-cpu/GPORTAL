export default function StatCard({ title, value, icon, helper, tone = "primary" }) {
  const valueTone = {
    primary: "text-primary",
    accent: "text-accent",
    default: "text-foreground",
    success: "text-green-600",
    danger: "text-red-600",
  }[tone];

  return (
    <div className="rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-start justify-between pb-2">
        <div>
          <p className="text-sm font-medium text-foreground">{title}</p>
          <h2 className={`mt-2 text-3xl font-bold ${valueTone}`}>
            {value}
          </h2>
          {helper ? (
            <p className="mt-1 text-xs text-muted-foreground">{helper}</p>
          ) : null}
        </div>
        <div className="text-muted-foreground [&>svg]:h-4 [&>svg]:w-4">
          {icon}
        </div>
      </div>
    </div>
  );
}
