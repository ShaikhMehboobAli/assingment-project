import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FormModule } from './form/form.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://mehboob1996:qwer1234@alicluster.urt5o2d.mongodb.net/assignment-project?retryWrites=true&w=majority',
    ),
    FormModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
