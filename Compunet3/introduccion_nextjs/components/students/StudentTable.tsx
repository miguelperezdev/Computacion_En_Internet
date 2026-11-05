import type { Student } from "@/interfaces/student.interface";
import { StudentRow } from "./StudentRow";

interface StudentTableProps {
  students: Student[];
}

const COLUMNS = [
  "ID",
  "Name",
  "Age",
  "Email",
  "Gender",
  "Subjects",
  "Grades",
  "Nickname",
  "Status",
] as const;

export const StudentTable = ({ students }: StudentTableProps) => {
  if (students.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center text-sm text-zinc-400">
        No hay estudiantes para mostrar.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/[0.02]">
      <table className="w-full min-w-[900px] text-left text-sm">
        <thead className="border-b border-white/10 bg-white/[0.04] text-xs uppercase tracking-wide text-zinc-400">
          <tr>
            {COLUMNS.map((column) => (
              <th key={column} scope="col" className="p-3 font-semibold">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {students.map((student) => (
            <StudentRow key={student.id} student={student} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
