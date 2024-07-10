import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnrollmentService } from './enrollement.service';
import { CreateEnrollmentDto } from './dto/create-enrollement.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollement.dto';

@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentService.create(createEnrollmentDto);
  }

  @Get()
  findAll() {
    return this.enrollmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enrollmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnrollmentDto: UpdateEnrollmentDto) {
    return this.enrollmentService.update(+id, updateEnrollmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enrollmentService.remove(+id);
  }

  @Post(':studentId/enroll/:courseId')
  enrollStudent(@Param('studentId') studentId: number, @Param('courseId') courseId: number) {
    return this.enrollmentService.enrollStudent(courseId, studentId);
  }

  @Post(':studentId/unenroll/:courseId')
  unenrollStudent(@Param('studentId') studentId: number, @Param('courseId') courseId: number) {
    return this.enrollmentService.unenrollStudent(courseId, studentId);
  }
}