import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { FormService } from './form.service';
import { Form } from './form.model';

@Controller('forms')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post()
  submitForm(@Body() formData: Form) {
    return this.formService.submitForm(formData);
  }

  @Get(':username')
  getFormByUsername(@Param('username') username: string) {
    return this.formService.getFormByUsername(username);
  }

  @Patch(':username')
  updateFormByUsername(
    @Param('username') username: string,
    @Body() formData: Form,
  ) {
    return this.formService.updateFormByUsername(username, formData);
  }
}
