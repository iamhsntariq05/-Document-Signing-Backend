import { Body, Controller, Param, Post } from '@nestjs/common';
import { SignersService } from './signers.service';
import { PrepareDocumentDto } from './dto/prepare-document.dto';

@Controller('documents')
export class SignersController {
  constructor(private signersService: SignersService) {}

  @Post(':id/prepare')
  async prepareDocument(
    @Param('id') documentId: string,
    @Body() prepareDto: PrepareDocumentDto
  ) {
    return this.signersService.prepare(documentId, prepareDto);
  }
}
