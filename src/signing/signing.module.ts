import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SigningService } from './signing.service';
import { SigningController } from './signing.controller';
import { Signer } from 'src/signers/entities/signer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Signer])],
  controllers: [SigningController],
  providers: [SigningService],
  exports: [SigningService], // optional
})
export class SigningModule {}
