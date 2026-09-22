import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import type { Student } from "./student.entity.js";

@Entity()
export class Grades {

    @PrimaryGeneratedColumn("uuid")
    id:string;
    @Column("text")
    subject:string;
    @Column("text")
    grade:number;
    @Column("text")
    studentId:string;

    @ManyToOne('Student', 'grades', {onDelete: "CASCADE"})
    student? : Student;
}
