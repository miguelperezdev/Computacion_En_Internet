import { cn } from "@/lib/utils";

interface StudentBadgeProps {
  active: boolean;
}

export const StudentBadge = ({ active }: StudentBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        active
          ? "bg-emerald-500/10 text-emerald-400 ring-emerald-500/30"
          : "bg-zinc-500/10 text-zinc-400 ring-zinc-500/30",
      )}
    >
      <span
        className={cn(
          "mr-1.5 h-1.5 w-1.5 rounded-full",
          active ? "bg-emerald-400" : "bg-zinc-400",
        )}
      />
      {active ? "Active" : "Inactive"}
    </span>
  );
};
