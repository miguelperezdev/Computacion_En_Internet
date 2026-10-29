import { Navbar } from "@/components/Navbar"
import { students } from "@/data/students.mock"

// se agg para que maneje la barra de navegacion, se puede agregar mas propiedades si se desea
import { NavLinks } from "@/interfaces/nav-links.interface"
const navLinks : NavLinks[] = [
    {
        href:"students",
        title:"Students"
    },
    {
        href:"about",
        title:"About"
    }
]
export default function Home() {

    // const students = [
    // {
    //     id: 1,
    //     name: "Mike",
    //     age:19,
    //     email:"mike@gmail.com",
    //     nickname:"la bestia",
    //     status:true

    // },
    // {
    //     id: 4,
    //     name: "c",
    //     age:19,
    //     email:"c@gmail.com",
    //     nickname:"la bestia",
    //     status:true

    // },
    // {
    //     id: 2,
    //     name: "b",
    //     age:19,
    //     email:"b@gmail.com",
    //     nickname:"la bestia",
    //     status:true

    // },
    // {
    //     id: 3,
    //     name: "a",
    //     age:19,
    //     email:"a@gmail.com",
    //     nickname:"la bestia",
    //     status:true

    // }
    // ]

    return (
        <div className="min-h-screen bg-black text-white">

            <Navbar links={navLinks}/>

            {/* MAIN */}
            <main className="flex flex-col items-center justify-center gap-6 py-12">
                <section
                    id="students"
                    className="flex w-full max-w-4xl flex-col items-center gap-6 px-6"
                >
                    <h2 className="text-3xl font-bold text-white">Students</h2>

                    <div className="w-full overflow-x-auto rounded-lg border border-gray-700">
                        <table className="w-full text-left text-sm text-slate-300">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="p-3">ID</th>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Age</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3">Gender</th>
                                    <th className="p-3">favoriteSubjects</th>
                                    <th className="p-3">Grades</th>
                                    <th className="p-3">Nickname</th>
                                    <th className="p-3">isActive</th>
                                </tr>
                            </thead>
                            <tbody>

                                {/* 
                            // Ejemplo de la forma real del student que viene del mock:
                            {
                                id: "1",
                                name: "Mike",
                                age: 19,
                                email: "mike@gmail.com",
                                gender: Gender.Male,
                                favoriteSubjects: ["Math", "Science"],
                                grades: [
                                    { id: "1", subject: "Math", grade: 90 },
                                    { id: "2", subject: "Science", grade: 85 }
                                ],
                                isActive: false,
                                nickname: "la bestia",
                            } 
                            */}

                                {students.map((student) => (
                                    <tr
                                        key={student.id}
                                        className="border-b border-slate-200 bg-slate-600"
                                    >
                                        <td className="p-3 font-normal">{student.id}</td>
                                        <td className="p-3 font-normal">
                                            <p className="text-lg font-semibold text-white">{student.name}</p>
                                            <p className="text-slate-400">{student.nickname}</p>
                                        </td>
                                        <td className="p-3 font-normal">{student.age}</td>
                                        <td className="p-3 font-normal">{student.email}</td>
                                        <td className="p-3 font-normal">{student.gender}</td>
                                        <td className="p-3 font-normal">{student.favoriteSubjects.join(", ")}</td>
                                        <td className="p-3 font-normal">
                                            {student.grades.map((grade) => `${grade.subject}: ${grade.grade}`).join(", ")}
                                        </td>
                                        <td className="p-3 font-normal">{student.nickname}</td>
                                        <td className="p-3">
                                            {
                                                student.isActive ?
                                                    (<span className="rounded-full bg-green-100 px-2 
                                                    py-0.5 text-xs font-medium text-green-700">
                                                        Active
                                                    </span>)
                                                    :
                                                    (<span className="rounded-full bg-gray-100 px-2 
                                                    py-0.5 text-xs font-medium text-gray-700">
                                                        Inactive
                                                    </span>)
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section id="about" className="flex flex-col items-center gap-6">
                    <h2 className="text-2xl font-bold">
                        About
                    </h2>
                    <p>
                        A Next.js frontend for NestJS + Postgres API we built in class.
                        for now the data is written by hand
                    </p>
                </section>
            </main>

        </div>
    )
}