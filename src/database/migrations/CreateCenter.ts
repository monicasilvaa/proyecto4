import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCenter1704369900838 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
               name: "center",
               columns: [
                  {
                     name: "id",
                     type: "int",
                     isPrimary: true,
                     isGenerated: true,
                     generationStrategy: "increment",
                  },
                  {
                     name: "name",
                     type: "varchar",
                     length: "50",
                  },
                  {
                    name: "location",
                    type: "varchar",
                    length: "200",
                 },
                 {
                    name: "register_date",
                    type: "timestamp",
                 },
                 {
                    name: "modified_date",
                    type: "timestamp",
                 },
                 {
                    name: "deleted_date",
                    type: "timestamp",
                 },
               ],
            }),
            true
         );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("center");
    }

}
