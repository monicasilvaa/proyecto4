import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCenter1704367341782 implements MigrationInterface {

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
                    name: "address",
                    type: "varchar",
                    length: "255",
                 },
                 {
                    name: "phone",
                    type: "varchar",
                    length: "15",
                 },
                 {
                    name: "business_hours",
                    type: "varchar",
                    length: "100",
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
