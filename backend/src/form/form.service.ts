import { Injectable, HttpException,HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Form } from './form.model';

@Injectable()
export class FormService {
  constructor(@InjectModel('Form') private readonly formModel: Model<Form>) {}

  async submitForm(formData: Form) {
    const data = await this.formModel
      .findOne({ username: formData.username })
      .exec();
    console.log('data=--------', data);
    if (!data) {
      const newForm = new this.formModel(formData);
      return newForm.save();
    }

    throw new HttpException('This is an error', HttpStatus.FORBIDDEN);
  }

  async getFormByUsername(username: string) {
    return this.formModel.findOne({ username }).exec();
  }

  async updateFormByUsername(username: string, formData: Form) {
    return this.formModel.findOneAndUpdate({ username }, formData, {
      new: true,
    });
  }
}
