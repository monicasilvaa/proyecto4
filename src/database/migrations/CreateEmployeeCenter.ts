import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEmployeeCenter1704447713484 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
               name: "employeeCenter",
               columns: [
                  {
                     name: "id",
                     type: "int",
                     isPrimary: true,
                     isGenerated: true,
                     generationStrategy: "increment",
                  },
                  {
                     name: "employee_id",
                     type: "int",
                     length: "50",
                     isUnique: true,
                  },
                  {
                    name: "center_id",
                    type: "int",
                 },
               ],
               foreignKeys: [
                {
                   columnNames: ["employee_id"],
                   referencedTableName: "user",
                   referencedColumnNames: ["id"],
                },
                {
                    columnNames: ["center_id"],
                    referencedTableName: "center",
                    referencedColumnNames: ["id"],
                 },
             ],
            }),
            true
         );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("employeeCenter");
    }

}
