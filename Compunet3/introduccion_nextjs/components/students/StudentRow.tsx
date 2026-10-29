import { Student } from '@/interfaces/student.interface'
import React from 'react'
import { StudentBadge } from './StudentBadge'


export const StudentRow = ({ student }: { student: Student }) => {
    return (
        <tr className='border-b border-gray-700'>
            <td className='p-3'>{student.id}</td>
            <td className='p-3'>{student.name}</td>
            <td className='p-3'>{student.age}</td>
            <td className='p-3'>{student.email}</td>
            <td className='p-3'>{student.gender}</td>
            <td className='p-3'>{student.favoriteSubjects}</td>
            <td className='p-3'>{JSON.stringify(student.grades)}</td>
            <td className='p-3'>{student.nickname}</td>
            <td className='p-3'>{student.isActive}</td>
            <td className='p-3'>
                <StudentBadge active={student.isActive} />
            </td>
        </tr>
    )
}
