import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('point_items')
class PointItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  point_id: number;

  @Column()
  item_id: number;
}

export default PointItem;
