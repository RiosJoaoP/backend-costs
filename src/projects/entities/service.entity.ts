import { Project } from './project.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('service')
export class Service {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  cost: string;

  @Column()
  description: string;

  @ManyToOne(() => Project, (project: Project) => project.services)
  project: Project;
}
