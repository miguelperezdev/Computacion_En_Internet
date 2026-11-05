import type { Metadata } from "next";
import { Suspense } from "react";
import { StudentTableSkeleton } from "@/components/students/StudentTableSkeleton";
import { StudentsTableAsync } from "@/components/students/StudentsTableAsync";

export const metadata: Metadata = {
  title: "Students",
};



export default function StudentsPage() {
  return (
    <Suspense fallback={<StudentTableSkeleton />}>
      <StudentsTableAsync />
    </Suspense>
  );
}
