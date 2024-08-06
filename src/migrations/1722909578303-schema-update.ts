import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1722909578303 implements MigrationInterface {
    name = 'SchemaUpdate1722909578303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "role" TO "isAdmin"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isAdmin"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isAdmin" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isAdmin"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isAdmin" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "isAdmin" TO "role"`);
    }

}
