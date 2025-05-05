import { Module } from '@nestjs/common';
import { SignersController } from './signers.controller';
import { SignersService } from './signers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Signer } from '../signers/entities/signer.entity';
import { Field } from './entities/field.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Signer, Field])],
  controllers: [SignersController],
  providers: [SignersService],
})
export class SignerModule {}
