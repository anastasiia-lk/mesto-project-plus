import {
  Model, Schema, Document, model,
} from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import Unathorized from '../utils/errors/Unathorized';

export interface IUser {
  email: string,
  password: string,
  name: string;
  about: string;
  avatar: string;
}

interface IUserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  findUserByCred: (email: string, password: string) => Promise<Document<unknown, any, IUser>>
}

const userSchema = new Schema<IUser, IUserModel>({
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
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minLenght: 2,
    maxLength: 200,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
});

userSchema.static('findUserByCred', function findUserByCred(email: string, password: string) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unathorized('Почта или пароль некорректны'));
      }
      return bcrypt.compare(password, user.password)
        .then((match) => {
          if (!match) {
            return Promise.reject(new Unathorized('Почта или пароль некорректны'));
          }
          return user;
        });
    });
});

export default model<IUser, IUserModel>('user', userSchema);
