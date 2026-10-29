import { Student } from '@/interfaces/student.interface'
import React from 'react'
import { StudentRow } from './students/StudentRow'

export const Brand = (student: { students: Student[] }) => {
    return (

        <div className="overflow-x-auto">

        <table>
            <thead>

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
                    {student ? student.students.map((student) => (
                        <StudentRow key={student.id} student={student} />
                    )) : <p className="p-3">No students found</p>}
                </tbody>
            </thead>
        </table>
        </div>
    )
}
