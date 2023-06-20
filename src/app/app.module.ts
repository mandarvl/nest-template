import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    SequelizeModule.forRoot(AppService.sequelizeConfig),
    ContactModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
