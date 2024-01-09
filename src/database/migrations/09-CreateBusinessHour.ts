import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBusinessHour1704795927573 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "business_hours",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "dayOfWeek",
                        type: "varchar",
                    },
                    {
                        name: "openingTime",
                        type: "time",
                    },
                    {
                        name: "closingTime",
                        type: "time",
                    },
                    {
                        name: "center_id",
                        type: "int",
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["center_id"],
                        referencedTableName: "centers", 
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("business_hours");
    }

}
