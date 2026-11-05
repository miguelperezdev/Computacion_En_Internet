import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export const Section = ({
  id,
  title,
  description,
  children,
  className,
}: SectionProps) => {
  return (
    <section id={id} className={cn("space-y-4", className)}>
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-sm text-zinc-400">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
};
