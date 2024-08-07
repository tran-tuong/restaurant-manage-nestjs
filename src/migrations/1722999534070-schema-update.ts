import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1722999534070 implements MigrationInterface {
    name = 'SchemaUpdate1722999534070'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "menus" DROP COLUMN "available"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "menus" ADD "available" boolean NOT NULL DEFAULT true`);
    }

}
