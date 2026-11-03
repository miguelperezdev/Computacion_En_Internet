import { Navbar } from "@/components/Navbar";
import { StudentTable } from "@/components/students/StudentTable";
import { students } from "@/data/students.mock";
import type { navLinks } from "@/interfaces/nav-links.interface";

const navLinks: navLinks[] = [
  { href: "students", title: "Students" },
  { href: "about", title: "About" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar links={navLinks} />
      <main className="mx-auto max-w-5xl space-y-12 p-6">
        <section id="students">
          <h2>Students</h2>
          <StudentTable students={students} />
        </section>
        <section id="about">
          <h2>About this project</h2>
          <p>Hola mundo</p>
        </section>
      </main>
    </div>
  );
}
