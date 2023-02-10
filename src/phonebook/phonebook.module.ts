import { Module } from '@nestjs/common';
import { PhonebookService } from './phonebook.service';
import { PhonebookResolver } from './phonebook.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { Phonebook } from 'src/phonebook/models/phonebook.model';
import { S3Module } from '../s3/s3Service.module';

@Module({
  imports: [SequelizeModule.forFeature([Phonebook]), S3Module],
  providers: [PhonebookService, PhonebookResolver],
})
export class PhonebookModule {}
