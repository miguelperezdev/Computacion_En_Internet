import type { Grade } from "@/interfaces/student.interface";
import { cn } from "@/lib/utils";

interface StudentGradesProps {
  grades: Grade[];
}

export const StudentGrades = ({ grades }: StudentGradesProps) => {
  return (
    <div className="flex flex-wrap gap-1">
      {grades.map((grade) => (
        <span
          key={grade.id}
          title={`${grade.subject}: ${grade.grade}`}
          className={cn(
            "rounded-md px-2 py-0.5 text-xs ring-1 ring-inset",
            grade.grade >= 90
              ? "bg-emerald-500/10 text-emerald-300 ring-emerald-500/20"
              : grade.grade >= 80
                ? "bg-sky-500/10 text-sky-300 ring-sky-500/20"
                : "bg-amber-500/10 text-amber-300 ring-amber-500/20",
          )}
        >
          {grade.subject}: <strong className="font-semibold">{grade.grade}</strong>
        </span>
      ))}
    </div>
  );
};
