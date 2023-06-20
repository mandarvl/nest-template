import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Controller('contacts')
export class ContactController {
    constructor(private contactService: ContactService) { }

    @Post()
    async create(@Body() contactData: Partial<Contact>): Promise<Contact> {
        return this.contactService.create(contactData);
    }

    @Get()
    async findAll(): Promise<Contact[]> {
        return this.contactService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<Contact> {
        return this.contactService.findById(id);
    }

    @Put(':id')
    async updateById(
        @Param('id') id: number,
        @Body() contactData: Partial<Contact>,
    ): Promise<Contact> {
        return this.contactService.updateById(id, contactData);
    }

    @Delete(':id')
    async deleteById(@Param('id') id: number): Promise<void> {
        return this.contactService.deleteById(id);
    }
}
