import { Injectable } from '@nestjs/common';
import { Dialect } from 'sequelize';
import { Contact } from './contact/contact.model';

@Injectable()
export class AppService {

  public static sequelizeConfig = {
    dialect: 'mysql' as Dialect,
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'ecommerce',
    logging: console.log,
    define: {
      paranoid: true,
      timestamps: true
    },
    models: [Contact]
  };
}
