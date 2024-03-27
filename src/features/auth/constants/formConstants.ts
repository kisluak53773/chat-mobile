export const LOGIN_FIELDS = [
  {
    id: 'emailId',
    title: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    name: 'email',
    rules: {
      required: 'You should enter your email...',
      pattern: {
        message: 'Email should be real',
        value: /^\S+@\S+$/i,
      },
    },
  },
  {
    id: 'passwordId',
    title: 'Password',
    type: 'password',
    placeholder: 'Enter your password...',
    name: 'password',
    rules: {
      required: 'You should enter your password',
      minLength: {
        message: 'Password should contain at lest 4 symbols',
        value: 4,
      },
    },
  },
];

export const REGISTER_FIELDS = [
  {
    id: 'emailId',
    title: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    name: 'email',
    rules: {
      required: 'You should enter your email...',
      pattern: {
        message: 'Email should be real',
        value: /^\S+@\S+$/i,
      },
    },
  },
  {
    id: 'passwordId',
    title: 'Password',
    type: 'password',
    placeholder: 'Enter your password...',
    name: 'password',
    rules: {
      required: 'You should enter your password',
      minLength: {
        message: 'Password should contain at lest 4 symbols',
        value: 4,
      },
    },
  },
  {
    id: 'passwordRepeatId',
    title: 'Reapeat password',
    type: 'password',
    placeholder: 'Repeat your password...',
    name: 'passwordRepeat',
    rules: {
      required: 'You should enter your password',
      minLength: {
        message: 'Password should contain at lest 4 symbols',
        value: 4,
      },
    },
  },
];
