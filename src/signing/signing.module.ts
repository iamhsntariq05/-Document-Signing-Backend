import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SigningController } from './signing.controller';
import { SigningService } from './signing.service';
import { Signer } from '../signers/entities/signer.entity';
import { Field } from '../signers/entities/field.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Signer, Field])],
  controllers: [SigningController],
  providers: [SigningService],
})
export class SigningModule {}
