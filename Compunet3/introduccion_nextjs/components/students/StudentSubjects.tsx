interface StudentSubjectsProps {
  subjects: string[];
}

export const StudentSubjects = ({ subjects }: StudentSubjectsProps) => {
  return (
    <div className="flex flex-wrap gap-1">
      {subjects.map((subject) => (
        <span
          key={subject}
          className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-zinc-300"
        >
          {subject}
        </span>
      ))}
    </div>
  );
};
