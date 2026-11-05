import { connection } from "next/server";
import { studentService } from "@/services/student.service";
import { StudentTableContainer } from "./StudentTableContainer";

interface StudentsTableAsyncProps {
  initialLimit?: number;
}

/**
 * Server Component que consulta el backend con axios.
 * `connection()` evita que Next intente llamar a la API durante el build.
 */
export const StudentsTableAsync = async ({
  initialLimit,
}: StudentsTableAsyncProps) => {
  await connection();

  const students = await studentService.getStudents();

  return (
    <StudentTableContainer students={students} initialLimit={initialLimit} />
  );
};
