import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from '../enrollement/entities/enrollement.entity';
import { CreateEnrollmentDto } from './dto/create-enrollement.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollement.dto';
import { Student } from '../student/entities/student.entity';
import { Course } from '../course/entities/course.entity';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,

    @InjectRepository(Student)
    private studentRepository: Repository<Student>,

    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async create(createEnrollmentDto: CreateEnrollmentDto): Promise<Enrollment> {
    const { studentId, courseId } = createEnrollmentDto;
    return this.enrollStudent(courseId, studentId);
  }

  findAll(): Promise<Enrollment[]> {
    return this.enrollmentRepository.find({ relations: ['student', 'course'] });
  }

  findOne(id: number): Promise<Enrollment> {
    return this.enrollmentRepository.findOne({ where: { id }, relations: ['student', 'course'] });
  }

  async update(id: number, updateEnrollmentDto: UpdateEnrollmentDto): Promise<Enrollment> {
    const enrollment = await this.enrollmentRepository.findOne({ where: { id } });
    if (!enrollment) {
      throw new Error('Enrollment not found');
    }

    if (updateEnrollmentDto.studentId) {
      const student = await this.studentRepository.findOneBy({ id: updateEnrollmentDto.studentId });
      if (!student) {
        throw new Error('Student not found');
      }
      enrollment.student = student;
    }

    if (updateEnrollmentDto.courseId) {
      const course = await this.courseRepository.findOneBy({ id: updateEnrollmentDto.courseId });
      if (!course) {
        throw new Error('Course not found');
      }
      enrollment.course = course;
    }

    if (updateEnrollmentDto.enrollmentNumber) {
      enrollment.enrollmentNumber = updateEnrollmentDto.enrollmentNumber;
    }

    await this.enrollmentRepository.save(enrollment);
    return this.enrollmentRepository.findOne({ where: { id }, relations: ['student', 'course'] });
  }

  async remove(id: number): Promise<void> {
    await this.enrollmentRepository.delete(id);
  }

  public async enrollStudent(courseId: number, studentId: number): Promise<Enrollment> {
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

    return this.enrollmentRepository.save(enrollment);
  }

  public async unenrollStudent(courseId: number, studentId: number): Promise<void> {
    const enrollment = await this.enrollmentRepository.findOne({
      where: { course: { id: courseId }, student: { id: studentId } },
    });

    if (!enrollment) {
      throw new Error('Enrollment not found');
    }

    await this.enrollmentRepository.remove(enrollment);
  }
}