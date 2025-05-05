import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentService } from './documents.service';
import { DocumentController } from './documents.controller';
import { Document } from './entities/document.entity';
import { Signer } from '../signers/entities/signer.entity';
import { Field } from '../signers/entities/field.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Document, Signer, Field])],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {}
