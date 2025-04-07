import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

// 👇 이 두 줄 추가
import { SttController } from './stt/stt.controller';
import { SttService } from './stt/stt.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['./env', '.env'],
      isGlobal: true,
    }),
  ],
  controllers: [AppController, SttController], 
  providers: [AppService, SttService],       
})
export class AppModule {}
