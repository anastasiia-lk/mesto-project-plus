import { Schema, model, ObjectId } from 'mongoose';
import { IUser } from './user';

interface ICard {
  name: string;
  link: string;
  owner: IUser;
  likes: ObjectId[];
  createdAt: Date;
}

const cardSchema = new Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  likes: { type: [Schema.Types.ObjectId], ref: 'user', default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default model<ICard>('card', cardSchema);