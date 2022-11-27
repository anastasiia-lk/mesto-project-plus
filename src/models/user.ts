import { Schema, model } from 'mongoose';
import validator from 'validator';

export interface IUser {
  email: string,
  password: string,
  name: string;
  about: string;
  avatar: string;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email: string) => validator.isEmail(email),
      message: 'Указан неверный формат почты',
    },
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
  name: {
    type: String,
    minLenght: 2,
    maxLingth: 30,
    required: true,
  },
  about: {
    type: String,
    minLenght: 2,
    maxLength: 200,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
});

export default model('user', userSchema);
