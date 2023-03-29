import { Category } from 'src/categories/entities/category.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { Service } from './service.entity';

@Entity('project')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  budget: string;

  @Column()
  cost: number;

  @JoinTable()
  @ManyToOne(() => Category, (category: Category) => category.project)
  category: Category;

  @JoinTable()
  @OneToMany(() => Service, (service: Service) => service.project)
  services: Service[];
}
