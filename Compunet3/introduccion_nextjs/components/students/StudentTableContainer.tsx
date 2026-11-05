"use client";

import { useMemo } from "react";
import type { Student } from "@/interfaces/student.interface";
import { usePagination } from "@/hooks/usePagination";
import { DEFAULT_LIMIT, paginate } from "@/lib/pagination";
import { Pagination } from "@/components/ui/Pagination";
import { StudentTable } from "./StudentTable";

interface StudentTableContainerProps {
  students: Student[];
  initialSkip?: number;
  initialLimit?: number;
}

export const StudentTableContainer = ({
  students,
  initialSkip = 0,
  initialLimit = DEFAULT_LIMIT,
}: StudentTableContainerProps) => {
  const { skip, limit, meta, setLimit, goToPage } = usePagination({
    total: students.length,
    initialSkip,
    initialLimit,
  });

  const visibleStudents = useMemo(
    () => paginate(students, { skip, limit }),
    [students, skip, limit],
  );

  return (
    <div className="space-y-4">
      <StudentTable students={visibleStudents} />
      <Pagination
        meta={meta}
        onPageChange={goToPage}
        onLimitChange={setLimit}
      />
    </div>
  );
};
