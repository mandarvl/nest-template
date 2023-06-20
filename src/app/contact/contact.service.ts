import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Contact, ContactAuthResponse } from './contact.model';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class ContactService {
    constructor(
        @InjectModel(Contact)
        private contactModel: typeof Contact
    ) { }

    async create(contactData: Partial<Contact>): Promise<Contact> {
        const contact = new Contact(contactData);
        
        return contact.save();
    }

    async findAll(): Promise<Contact[]> {
        return this.contactModel.findAll();
    }

    async findById(id: number): Promise<Contact> {
        return this.contactModel.findByPk(id);
    }

    async updateById(
        id: number,
        contactData: Partial<Contact>,
    ): Promise<Contact> {
        const contact = await this.findById(id);
        return contact.update(contactData);
    }

    async deleteById(id: number): Promise<void> {
        const contact = await this.findById(id);
        contact.destroy();
    }

    async login(email: string, password: string): Promise<any> {
        return this.contactModel.findOne({
            where: {
                email
            }
        }).then(data => {
            if (data) {
              const user = data.toJSON();
              if (user.isActive) {
                if (user.password) {
                  return bcrypt.compare(password, user.password).then((isEquals) => {
                    if (isEquals) {
                      return this.getAuthResponse(user);
                    }
                    else {
                      throw new HttpException('PASSWORD_NOT_CORRECT', HttpStatus.UNAUTHORIZED);
                    }
                  });
                }
                else {
                  throw new HttpException('PASSWORD_NOT_SET', HttpStatus.INTERNAL_SERVER_ERROR);
                }
              }
              else {
                throw new HttpException('ACCOUNT_NOT_ENABLED', HttpStatus.UNAUTHORIZED);
              }
            }
            else {
              throw new HttpException('ACCOUNT_NOT_FOUND', HttpStatus.NOT_FOUND);
            }
        })
    }

    async register(data: Partial<Contact>): Promise<ContactAuthResponse> {
      const contact: Partial<Contact> = {
        ...data,
        isActive: true,
        password: bcrypt.hashSync(data.password, 10)
      };

      return this.create(contact).then(contact => {
        return this.getAuthResponse(contact.toJSON());
      });
    }

    private getAuthResponse(user: Partial<Contact>) {
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email
        },
        process.env.PUBLIC_TOKEN_KEY || '',
        {
          expiresIn: "8h",
        }
      );

      const result = {
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        },
        token
      } as ContactAuthResponse;

      return result;
    }
}
