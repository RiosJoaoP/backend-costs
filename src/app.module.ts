import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ProjectsModule,
    CategoriesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://postgres:oO5GI23TPelSplbcodTW@containers-us-west-142.railway.app:5862/railway',
      host: 'containers-us-west-142.railway.app',
      port: 5862,
      username: 'postgres',
      password: 'oO5GI23TPelSplbcodTW',
      database: 'railway',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
