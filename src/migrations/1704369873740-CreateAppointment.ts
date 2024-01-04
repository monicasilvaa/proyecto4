import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAppointment1704369873740 implements MigrationInterface {

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
                     name: "appointment_date",
                     type: "timestamp",
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
        await queryRunner.dropTable("appointment");
    }


}
