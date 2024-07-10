import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { Course } from '../../course/entities/course.entity';
import { Student } from '../../student/entities/student.entity';

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course, { eager: true })
  @JoinColumn()
  course: Course;

  @ManyToOne(() => Student, { eager: true })
  @JoinColumn()
  student: Student;

  @Column()
  enrollmentNumber: string;
}