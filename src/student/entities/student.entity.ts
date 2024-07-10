// student.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Course } from '../../course/entities/course.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @ManyToMany(() => Course)
  @JoinTable()
  courses: Course[];

  @CreateDateColumn()
  createdAt: Date;

  @Column('json', { nullable: true })
  enrollmentNumbers: { [courseId: number]: string };
}
