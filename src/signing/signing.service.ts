import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Signer } from '../signers/entities/signer.entity';

@Injectable()
export class SigningService {
  constructor(
    @InjectRepository(Signer)
    private readonly signerRepo: Repository<Signer>,
  ) {}

  async sendForSigning(documentId: string) {
    let url = '';
    const signers = await this.signerRepo.find({
      where: {
        document: {
          id: documentId,
        },
      } as any, 
      relations: ['document'],
    });
    

    if (!signers.length) throw new NotFoundException('No signers found.');

    // Simulate email sending
    for (const signer of signers) {
      if (!signer.signingToken) {
        signer.signingToken = crypto.randomUUID();
        await this.signerRepo.save(signer);
      }

      url = `http://localhost:3000/sign/${signer.signingToken}`;
      console.log(`Simulating email to ${signer.email}`);
      console.log(`Visit this link to sign: ${url}`);
    }
    return {
      message: 'Document sent for signing',
      signerCount: signers.length,
      URL :url
    };
  }
}
