import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import * as path from 'path';
import { Signer } from 'src/signers/entities/signer.entity';
import { Field } from 'src/signers/entities/field.entity';
 
@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private docRepo: Repository<Document>,
    @InjectRepository(Signer)
    private readonly signerRepo: Repository<Signer>,
    @InjectRepository(Field)
    private readonly fieldRepo: Repository<Field>,
  ) {}

  async saveDocument(file: Express.Multer.File): Promise<Document> {
    const doc = this.docRepo.create({
      filename: file.originalname,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size,
    });
    return this.docRepo.save(doc);
  }

  async getMetadata(id: string): Promise<Document> {
    const doc = await this.docRepo.findOne({ where: { id } });
    if (!doc) throw new NotFoundException('Document not found');
    return doc;
  }

  async getFilePath(id: string): Promise<string> {
    const doc = await this.getMetadata(id);
    return path.resolve(doc.path);
  }


  async getFinalDocument(documentId: string) {
    const document = await this.docRepo.findOne({
      where: { id: documentId },
      relations: ['signers', 'signers.fields'],
    });

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    const result = {
      id: document.id,
      title: document.title ? document.title : 'Untitled',
      createdAt: document.createdAt,
      signers: document.signers.map((signer) => ({
        id: signer.id,
        name: signer.name,
        email: signer.email,
        signingToken: signer.signingToken,
        fields: signer.fields.map((field) => ({
          name: field.name,
          value: field.value,
        })),
      })),
    };

    return result;
  }


}
