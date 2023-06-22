import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Form } from './form.model';

@Injectable()
export class FormService {
  constructor(@InjectModel('Form') private readonly formModel: Model<Form>) {}

  /*
    service for create user with user detail
    POST public /form
  */
  async submitForm(formData: Form) {
    const data = await this.formModel
      .findOne()
      .or([{ username: formData.username }, { email: formData.email }])
      .exec();
    if (!data) {
      const newForm = new this.formModel(formData);
      return newForm.save();
    }

    throw new HttpException('Email id already exist.', HttpStatus.FORBIDDEN);
  }

  /*
    service for getting the detail of username if exist 
    GET public /form/{username}
  */
  async getFormByUsername(username: string) {
    return await this.formModel.findOne({ username: username }).exec();
  }

  /*
    service for updating the detail of username if exist 
    PATCH public /form/{username}
  */
  async updateFormByUsername(username: string, formData: Form) {
    return this.formModel.findOneAndUpdate({ username }, formData, {
      new: true,
    });
  }
}
