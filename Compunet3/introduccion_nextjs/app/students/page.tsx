import type { Metadata } from "next";
import { StudentTableContainer } from "@/components/students/StudentTableContainer";
import { students } from "@/data/students.mock";

export const metadata: Metadata = {
  title: "Students",
};

export default function StudentsPage() {
  return <StudentTableContainer students={students} />;
}
