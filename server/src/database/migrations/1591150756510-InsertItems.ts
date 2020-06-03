import { MigrationInterface, QueryRunner } from 'typeorm';

export default class InsertItems1591150756510 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO items(id, title, image) VALUES(1, 'Lâmpadas', 'lampadas.svg');
            INSERT INTO items(id, title, image) VALUES(2, 'Pilhas e baterias', 'baterias.svg');
            INSERT INTO items(id, title, image) VALUES(3, 'Papéis e papelão', 'papeis-papelao.svg');
            INSERT INTO items(id, title, image) VALUES(4, 'Resíduos Eletrônicos', 'eletronicos.svg');
            INSERT INTO items(id, title, image) VALUES(5, 'Resíduos Orgânicos', 'organicos.svg');
            INSERT INTO items(id, title, image) VALUES(6, 'Óleo de Cozinha', 'oleo.svg');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM items');
  }
}
