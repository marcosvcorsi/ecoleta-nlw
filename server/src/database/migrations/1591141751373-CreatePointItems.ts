import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePointItems1591141751373 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'point_items',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'point_id',
            type: 'integer',
          },
          {
            name: 'item_id',
            type: 'integer',
          },
        ],
        foreignKeys: [
          {
            name: 'PointItemsPoint',
            referencedTableName: 'points',
            referencedColumnNames: ['id'],
            columnNames: ['point_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'PointItemsItem',
            referencedTableName: 'items',
            referencedColumnNames: ['id'],
            columnNames: ['item_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('point_items');
  }
}
