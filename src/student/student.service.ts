import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Course } from '../course/entities/course.entity';
import { Enrollment } from '../enrollement/entities/enrollement.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,

    @InjectRepository(Course)
    private courseRepository: Repository<Course>,

    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
  ) {}

  findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  findOne(id: number): Promise<Student> {
    return this.studentRepository.findOneBy({ id });
  }

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const student = this.studentRepository.create(createStudentDto);
    student.enrollmentNumbers = {};
    return this.studentRepository.save(student);
  }

  async update(id: number, updateStudentDto: UpdateStudentDto): Promise<Student> {
    await this.studentRepository.update(id, updateStudentDto);
    return this.studentRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.studentRepository.delete(id);
  }

  async enrollStudent(courseId: number, studentId: number): Promise<void> {
    const student = await this.studentRepository.findOneBy({ id: studentId });
    if (!student) {
      throw new Error('Student not found');
    }

    const course = await this.courseRepository.findOneBy({ id: courseId });
    if (!course) {
      throw new Error('Course not found');
    }

    const enrollmentNumber = `ENROLL-${courseId}-${studentId}-${Date.now()}`;

    const enrollment = new Enrollment();
    enrollment.course = course;
    enrollment.student = student;
    enrollment.enrollmentNumber = enrollmentNumber;

    await this.enrollmentRepository.save(enrollment);
  }

  async unenrollStudent(courseId: number, studentId: number): Promise<void> {
    const enrollment = await this.enrollmentRepository.findOne({
      where: { course: { id: courseId }, student: { id: studentId } },
    });

    if (!enrollment) {
      throw new Error('Enrollment not found');
    }

    await this.enrollmentRepository.remove(enrollment);
  }
}