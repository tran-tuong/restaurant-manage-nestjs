import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1722917168317 implements MigrationInterface {
    name = 'SchemaUpdate1722917168317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "refreshToken" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshToken"`);
    }

}
