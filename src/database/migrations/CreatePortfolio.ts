import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePortfolio1704367341785 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
               name: "portfolio",
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
                     isUnique: true,
                  },
                  {
                    name: "employee_user_id",
                    type: "int",
                 },
                 {
                    name: "created_at",
                    type: "timestamp",
                 },
               ],
               foreignKeys: [
                {
                   columnNames: ["employee_user_id"],
                   referencedTableName: "user",
                   referencedColumnNames: ["id"],
                },
             ],
            }),
            true
         );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("portfolio");
    }

}
