// course.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  findAll(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  findOne(id: number): Promise<Course> {
    return this.courseRepository.findOneBy({ id });
  }

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = this.courseRepository.create(createCourseDto);
    course.expirationDate = this.convertToDate(createCourseDto.expirationDate);
    course.isExpired = this.calculateExpirationStatus(course.expirationDate);
    return this.courseRepository.save(course);
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const updatedCourse = {
      ...updateCourseDto,
      expirationDate: this.convertToDate(updateCourseDto.expirationDate),
      isExpired: this.calculateExpirationStatus(this.convertToDate(updateCourseDto.expirationDate)),
    };
    await this.courseRepository.update(id, updatedCourse);
    return this.courseRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.courseRepository.delete(id);
  }

  private calculateExpirationStatus(expirationDate?: Date): boolean {
    if (!expirationDate) {
      return false;
    }
    const currentDate = new Date();
    return currentDate > expirationDate;
  }

  private convertToDate(dateString?: string): Date | undefined {
    if (!dateString) {
      return undefined;
    }
    const [day, month, year] = dateString.split('/');
    return new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
  }
}
