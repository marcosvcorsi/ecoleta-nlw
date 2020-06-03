import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import PointItem from './PointItem';

@Entity('points')
class Point {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  whatsapp: string;

  @Column()
  city: string;

  @Column()
  uf: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @OneToMany(() => PointItem, (pointItem) => pointItem.point, {
    eager: true,
    cascade: ['insert'],
  })
  pointItems: PointItem[];
}

export default Point;
