import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Signer } from './entities/signer.entity';
import { Field } from './entities/field.entity';
import { PrepareDocumentDto } from './dto/prepare-document.dto';

@Injectable()
export class SignersService {
  constructor(
    @InjectRepository(Signer)
    private signerRepo: Repository<Signer>,
    @InjectRepository(Field)
    private fieldRepo: Repository<Field>,
  ) {}

  async prepare(documentId: string, dto: PrepareDocumentDto) {
    const savedSigners: Signer[] = [];

    for (const signer of dto.signers) {
      const newSigner = this.signerRepo.create({
        name: signer.name,
        email: signer.email,
        document : { id: documentId },
        fields: signer.fields.map((f) => this.fieldRepo.create({ ...f })),
      });

      const saved = await this.signerRepo.save(newSigner);
      savedSigners.push(saved);
    }

    return { message: 'Document prepared successfully', signers: savedSigners };
  }
}
