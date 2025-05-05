import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SigningService } from './signing.service';

@Controller('documents')
export class SigningController {
  constructor(private signingService: SigningService) {}

  @Post(':id/send')
  async sendDocument(@Param('id') documentId: string) {
    return this.signingService.sendForSigning(documentId);
  }

  @Get('signed/:signerToken')
  async getSigningView(@Param('signerToken') token: string) {
    return this.signingService.getSigningView(token);
  }
  @Post('signed/:signerToken')
  async submitSignedData(
    @Param('signerToken') token: string,
    @Body() signedFields: Record<string, string>,
  ) {
    return this.signingService.submitSignedFields(token, signedFields);
  }
}
