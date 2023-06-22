import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { FormService } from './form.service';
import { Form } from './form.model';

@Controller('forms')
export class FormController {
  constructor(private readonly formService: FormService) {}

  /*
    Routes for create user with user detail
    POST public /form
  */
  @Post()
  submitForm(@Body() formData: Form) {
    return this.formService.submitForm(formData);
  }

  /*
    Routes for getting the detail of username if exist 
    GET public /form/{username}
  */
  @Get(':username')
  getFormByUsername(@Param('username') username: string) {
    return this.formService.getFormByUsername(username);
  }

  /*
    Routes for updating the detail of username if exist 
    PATCH public /form/{username}
  */
  @Patch(':username')
  updateFormByUsername(
    @Param('username') username: string,
    @Body() formData: Form,
  ) {
    return this.formService.updateFormByUsername(username, formData);
  }
}
