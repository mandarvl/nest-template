import { Sequelize } from "sequelize-typescript";
import { join } from "path";
import { AppService } from "./app/app.service";
import { SequelizeTypescriptMigration } from "@mandarvl/sequelize-typescript-migration";

const bootstrap = async () => {
  const sequelize: Sequelize = new Sequelize(AppService.sequelizeConfig);
  try {
    const result = await SequelizeTypescriptMigration.makeMigration(sequelize, {
      outDir: join(__dirname, "./database/migrations"),
      migrationName: "init database",
      useSnakeCase: false,
    });
    console.log(result);
  } catch (e) {
    console.log(e);
  }
};

bootstrap();