import { Module } from '@nestjs/common';
import { EnrollementService } from './enrollement.service';
import { EnrollementController } from './enrollement.controller';

@Module({
  controllers: [EnrollementController],
  providers: [EnrollementService],
})
export class EnrollementModule {}
