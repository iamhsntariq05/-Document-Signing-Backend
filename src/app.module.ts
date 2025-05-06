import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DocumentModule } from './documents/documents.module';
import { SignerModule } from './signers/signers.module';
import { SigningModule } from './signing/signing.module';
import { StorageModule } from './storage/storage.module';
import { AppConfigModule } from './config/config.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';  

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    DocumentModule,
    SignerModule,
    SigningModule,
    StorageModule,
    AppConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {}