import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BeforeUpdate } from "typeorm";
import type { Grades } from "./grades.entity.js";

@Entity()
export class Student {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("text")
    name: string;

    @Column({
        type: "int"
    })
    age: number;

    @Column({
        type: "varchar",
        unique: true
    })
    email: string;

    @Column("boolean")
    isActive: boolean;

    @Column("text")
    gender: string;

    @Column({
        type: "text",
        array: true,
        default: []
    })
    favoriteSubjects: string[];

    @Column("text")
    nickname: string;

    @OneToMany('Grades', 'student', { cascade: true })
    grades: Grades[];

    @BeforeInsert()
    @BeforeUpdate()
    checkNickname() {
    this.nickname = `${this.name.toLowerCase().replace(/ /g, "_")}_${this.age}`;
}
}