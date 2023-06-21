// import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }
// }


import { Controller, Get, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  @Redirect('/api')
  getApi(): string {
    return this.appService.getHello();
  }
}
