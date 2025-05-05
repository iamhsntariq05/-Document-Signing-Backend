import { Controller, Post, Get, Param, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentService } from './documents.service';
import { diskStorage } from 'multer';
import { Response } from 'express';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
    }),
  }))
  async upload(@UploadedFile() file: Express.Multer.File) {
    return this.documentService.saveDocument(file);
  }

  @Get(':id')
  async getMetadata(@Param('id') id: string) {
    return this.documentService.getMetadata(id);
  }

  @Get(':id/download')
  async download(@Param('id') id: string, @Res() res: Response) {
    const filePath = await this.documentService.getFilePath(id);
    res.download(filePath);
  }

  @Get(':id/final')
  async getFinalDocument(@Param('id') documentId: string) {
    return this.documentService.getFinalDocument(documentId);
  }
}
