import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { Servico } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [Servico],
})
export class AppModule {}
