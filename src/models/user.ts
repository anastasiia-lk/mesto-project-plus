import { Schema, model } from 'mongoose';

export interface IUser {
  name: string;
  about: string;
  avatar: string;
}

const userSchema = new Schema<IUser>({
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
