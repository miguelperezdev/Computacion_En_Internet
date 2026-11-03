import React from "react";
import { StudentLayout } from "./layout";
import { StudentTable } from "@/components/students/StudentTable";
import { students } from "@/data/students.mock";

export default function StudentPage() {
  return (
    <StudentLayout>
      <StudentTable students={students} />
    </StudentLayout>
  );
}
