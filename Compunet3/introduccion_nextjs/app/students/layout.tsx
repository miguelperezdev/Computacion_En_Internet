import React from "react";

export const StudentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Students</h1>
      {children}
    </div>
  );
};