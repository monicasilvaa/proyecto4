import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAppointment1704367341784 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
               name: "appointment",
               columns: [
                  {
                     name: "id",
                     type: "int",
                     isPrimary: true,
                     isGenerated: true,
                     generationStrategy: "increment",
                  },
                  {
                     name: "client_user_id",
                     type: "int",
                  },
                  {
                     name: "employee_user_id",
                     type: "int",
                  },
                  {
                     name: "appointment_date",
                     type: "timestamp",
                  },
                  {
                     name: "service_id",
                     type: "int",
                  },
                  {
                     name: "center_id",
                     type: "int",
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
                     name: "modified_by",
                     type: "varchar",
                     length: "255",
                  },
                  {
                     name: "deleted_date",
                     type: "timestamp",
                  },
               ],
               foreignKeys: [
                  {
                     columnNames: ["client_user_id"],
                     referencedTableName: "user",
                     referencedColumnNames: ["id"],
                  },
                  {
                     columnNames: ["employee_user_id"],
                     referencedTableName: "user",
                     referencedColumnNames: ["id"],
                  },
                  {
                     columnNames: ["service_id"],
                     referencedTableName: "service",
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
        await queryRunner.dropTable("appointment");
    }


}
