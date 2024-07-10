import { Module } from '@nestjs/common';
import { EnrollmentService } from './enrollement.service';
import { EnrollmentController } from './enrollement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from './entities/enrollement.entity';
import { Student } from '../student/entities/student.entity';
import { Course } from '../course/entities/course.entity';
import { CourseModule } from 'src/course/course.module';

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment, Student, Course]), CourseModule],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
})
export class EnrollmentModule {}
