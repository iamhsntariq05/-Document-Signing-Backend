import { Controller, Param, Post } from '@nestjs/common';
import { SigningService } from './signing.service';

@Controller('documents')
export class SigningController {
  constructor(private signingService: SigningService) {}

  @Post(':id/send')
  async sendDocument(@Param('id') documentId: string) {
    return this.signingService.sendForSigning(documentId);
  }
}
