import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1722933068141 implements MigrationInterface {
    name = 'SchemaUpdate1722933068141'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "isAdmin" TO "roles"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roles"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "roles" character varying NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roles"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "roles" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "roles" TO "isAdmin"`);
    }

}
