import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Signer } from '../signers/entities/signer.entity';
import { Field } from 'src/signers/entities/field.entity';

@Injectable()
export class SigningService {
  constructor(
    @InjectRepository(Signer)
    private readonly signerRepo: Repository<Signer>,
    @InjectRepository(Field)
    private readonly fieldRepo: Repository<Field>,

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

  async getSigningView(signerToken: string) {
    const signer = await this.signerRepo.findOne({
      where: { signingToken: signerToken },
      relations: ['document', 'fields'],
    });

    if (!signer) throw new NotFoundException('Invalid signer token');

    return {
      document: signer.document, 
      fields: signer.fields,
    };
  }

  async submitSignedFields(signerToken: string, signedFields: { [fieldId: string]: string }) {
    const signer = await this.signerRepo.findOne({
      where: { signingToken: signerToken },
      relations: ['fields'],
    });

    if (!signer) throw new NotFoundException('Invalid signer token');

    for (const field of signer.fields) {
      const value = signedFields[field.id];
      if (value) {
        field.value = value;
        field.signed = true;
        await this.fieldRepo.save(field);
      }
    }

    return { message: 'Fields submitted successfully.' };
  }

}
