import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContactController } from './contact.controller';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Module({
  imports: [SequelizeModule.forFeature([Contact])],
  controllers: [ContactController],
  providers: [ContactService]
})
export class ContactModule {}
