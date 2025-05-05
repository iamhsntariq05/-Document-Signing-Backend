import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import * as path from 'path';
 
@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private docRepo: Repository<Document>,
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
}
