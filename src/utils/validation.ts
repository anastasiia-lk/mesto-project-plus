import { Joi, celebrate, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import BadReq from './errors/BadReq';

const VALID_ID = Joi.string().required().custom((value) => {
  if (isValidObjectId(value)) {
    return value;
  }
  return new BadReq('Переданы некорректные данные');
}, 'Id validation');

const VALID_NAME = Joi.string().min(2).max(30).messages({
  'string.min': 'Имя должно быть длиннее 2 символов',
  'string.max': 'Имя должно быть короче 30 символов',
  'string.empty': 'Имя должно быть указано',
});
const VALID_ABOUT = Joi.string().min(2).max(30).messages({
  'string.min': 'Должно быть длиннее 2 символов',
  'string.max': 'Должно быть короче 30 символов',
  'string.empty': 'Должно быть указано',
});
const VALID_AVATAR = Joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/).messages({
  'any.required': 'Должен быть предоставлен',
  'string.empty': 'Не может быть пустым',
  'string.pattern.base': 'Укажите действующую ссылку',
});
const VALID_EMAIL = Joi.string().required().email().messages({
  'any.required': 'Должен быть указан',
  'string.empty': 'Не может быть пустым',
});
const VALID_PASS = Joi.string().required().messages({
  'any.required': 'Должен быть указан',
  'string.empty': 'Не может быть пустым',
});
const VALID_LINK = Joi.string().required().messages({
  'any.required': 'Должна быть указана',
});

export const getUserValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: VALID_ID,
  }),
});

export const updateUserValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: VALID_NAME,
    about: VALID_ABOUT,
  }),
});

export const updateAvatarValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: VALID_AVATAR.required(),
  }),
});

export const loginValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: VALID_EMAIL,
    password: VALID_PASS,
  }),
});

export const createUserValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: VALID_EMAIL,
    password: VALID_PASS,
    name: VALID_NAME,
    about: VALID_ABOUT,
    avatar: VALID_AVATAR,
  }),
});

export const createCardValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: VALID_NAME,
    link: VALID_LINK,
  }),
});

export const cardValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: VALID_ID,
  }),
});
