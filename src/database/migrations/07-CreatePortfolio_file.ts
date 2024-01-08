import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePortfolioFile1704367341786 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
               name: "portfolio_files",
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
                    name: "portfolio_id",
                    type: "int",
                 },
                 {
                    name: "created_at",
                    type: "timestamp",
                 }
               ],
               foreignKeys: [
                {
                   columnNames: ["portfolio_id"],
                   referencedTableName: "portfolios",
                   referencedColumnNames: ["id"],
                },
             ],
            }),
            true
         );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("portfolio_files");
    }

}
