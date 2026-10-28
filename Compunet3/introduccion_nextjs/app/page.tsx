import { Navbar } from "@/components/Navbar"

export default function Home() {

    const students = [
    {
        id: 1,
        name: "Mike",
        age:19,
        email:"mike@gmail.com",
        nickname:"la bestia",
        status:true
        
    },
    {
        id: 4,
        name: "c",
        age:19,
        email:"c@gmail.com",
        nickname:"la bestia",
        status:true
        
    },
    {
        id: 2,
        name: "b",
        age:19,
        email:"b@gmail.com",
        nickname:"la bestia",
        status:true
        
    },
    {
        id: 3,
        name: "a",
        age:19,
        email:"a@gmail.com",
        nickname:"la bestia",
        status:true
        
    }
    ]
    
    return (
        <div className="min-h-screen bg-black text-white">

            {/* NAVBAR */}
            <nav className="flex items-center justify-between bg-gray-900 px-6 py-4">

                <Navbar/>
                {/* IZQUIERDA: Dashboard */}
                <a
                    href="#dashboard"
                    className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-slate-200 transition"
                >
                    Dashboard
                </a>

                {/* DERECHA: Students + About */}
                <div className="flex items-center gap-6">
                    <a href="#" className="text-lg font-bold text-white">Students</a>
                    <a href="#about" className="text-slate-300 hover:text-white transition">About</a>
                </div>

            </nav>

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
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Age</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3">Gender</th>
                                    <th className="p-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>

                            {
                                students ? students.map((students)=> (

                                <tr key= {students.id}className="border-b border-slade-200 bg-slade-600">
                                    <th className="p-3">
                                        <p className="text-lg font-semibold text-white">Mike</p>
                                        <p className="text-slate-400">Perez</p>
                                    </th>
                                    <th className="p-3 font-normal">{students.id}</th>
                                    <th className="p-3 font-normal">{students.name}</th>
                                    <th className="p-3 font-normal">{students.email}</th>
                                    <th className="p-3 font-normal text-green-400">{students.status}</th>
                                    {
                                        students.status ?
                                        (<span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-green-400">Active</span>)
                                        :
                                        (<span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-red-600">inactive</span>)
                                    }
                                </tr>

                                )) : ""
                            }
                            </tbody>
                        </table>
                    </div>
                </section>

                <section id="about" className="flex flex-col items-center gap-6">
                    <h2 className="text-2xl font-bold">
                        About
                    </h2>
                    <p>
                        Tonces, esto es una app de prueba 
                    </p>
                </section>
            </main>

        </div>
    )
}