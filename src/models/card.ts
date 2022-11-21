import { Schema, model, ObjectId } from 'mongoose';
import mongoose from 'mongoose';

interface ICard {
  name: string;
  link: string;
  owner: ObjectId;
  likes: ReadonlyArray<mongoose.Types.ObjectId>;
  createdAt: Date;
}

const cardSchema = new Schema<ICard>({
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
    required: true,
  },
  likes: [{
    type: Schema.Types.ObjectId,
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default model('card', cardSchema);
