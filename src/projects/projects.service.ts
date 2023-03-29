import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { Service } from './entities/service.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  findAll() {
    return this.projectRepository.find({
      relations: ['category', 'services'],
    });
  }

  async findOne(id: number) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['category', 'services'],
    });

    if (!project) {
      throw new NotFoundException(`Project ID ${id} not found`);
    }

    return project;
  }

  async create(createProjectDto) {
    const project = this.projectRepository.create({
      ...createProjectDto,
    });
    return this.projectRepository.save(project);
  }

  async update(id: any, updateProjectDto) {
    updateProjectDto.services &&
      (await Promise.all(
        updateProjectDto.services.map((service) => this.addService(service)),
      ));

    const project = await this.projectRepository.preload({
      id,
      ...updateProjectDto,
    });

    if (!project) {
      throw new NotFoundException(`Course ID ${id} not found`);
    }

    return this.projectRepository.save(project);
  }

  async remove(id: any) {
    const project = await this.projectRepository.findOne({ where: { id } });

    if (!project) {
      throw new NotFoundException(`Course ID ${id} not found`);
    }

    return this.projectRepository.remove(project);
  }

  private async addService(service: Service): Promise<Service> {
    return this.serviceRepository.save(service);
  }
}
