import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Point from './Point';
import Item from './Item';

@Entity('point_items')
class PointItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  point_id: number;

  @Column()
  item_id: number;

  @ManyToOne(() => Point)
  @JoinColumn({ name: 'point_id' })
  point: Point;

  @ManyToOne(() => Item)
  @JoinColumn({ name: 'item_id' })
  item: Item;
}

export default PointItem;
