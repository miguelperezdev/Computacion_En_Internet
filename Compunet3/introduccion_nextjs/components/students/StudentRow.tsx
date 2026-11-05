import type { Student } from "@/interfaces/student.interface";
import { StudentBadge } from "./StudentBadge";
import { StudentGrades } from "./StudentGrades";
import { StudentSubjects } from "./StudentSubjects";

interface StudentRowProps {
  student: Student;
}

export const StudentRow = ({ student }: StudentRowProps) => {
  return (
    <tr className="transition-colors hover:bg-white/[0.03]">
      <td className="p-3 font-mono text-xs text-zinc-400">{student.id}</td>
      <td className="p-3 font-medium text-zinc-100">{student.name}</td>
      <td className="p-3 text-zinc-300">{student.age}</td>
      <td className="p-3 text-zinc-300">{student.email}</td>
      <td className="p-3 text-zinc-300">{student.gender}</td>
      <td className="p-3">
        <StudentSubjects subjects={student.favoriteSubjects} />
      </td>
      <td className="p-3">
        <StudentGrades grades={student.grades} />
      </td>
      <td className="p-3 text-zinc-300">{student.nickname}</td>
      <td className="p-3">
        <StudentBadge active={student.isActive} />
      </td>
    </tr>
  );
};
