import { Schema, Document } from 'mongoose';

export interface Form extends Document {
  username: string;
  phoneNumber: string;
  email: string;
  name: string;
  dateOfBirth: Date;
}

export const FormSchema = new Schema<Form>({
  username: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
});
