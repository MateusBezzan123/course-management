import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student } from './entities/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from 'src/enrollement/entities/enrollement.entity';
import { CourseModule } from 'src/course/course.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Enrollment]),CourseModule, 
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
