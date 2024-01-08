import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEmployeeCenter1704447713484 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
               name: "employeeCenters",
               columns: [
                  {
                     name: "employee_id",
                     type: "int",
                     isPrimary: true,
                  },
                  {
                    name: "center_id",
                    type: "int",
                    isPrimary: true,
                 },
               ],
               foreignKeys: [
                {
                   columnNames: ["employee_id"],
                   referencedTableName: "users",
                   referencedColumnNames: ["id"],
                },
                {
                    columnNames: ["center_id"],
                    referencedTableName: "centers",
                    referencedColumnNames: ["id"],
                 },
             ],
            }),
            true
         );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("employeeCenters");
    }

}
