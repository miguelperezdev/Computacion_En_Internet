import React from 'react'

export const StudentBadge = ({active} : {active: boolean}) => {

    const color = active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700";
  return (
    <span className={`rounded-full ${color} px-2 py-0.5 text-xs font-medium`}>
     {active ? "Active" : "Inactive"}
    </span>
  )
}
