import {
  FieldError,
  Noop,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form';

export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegisterData {
  email: string;
  password: string;
  passwordRepeat: string;
}

export interface ISubmitButton {
  title: string;
  isValid: boolean;
  onSubmit: SubmitHandler<ILoginData> | SubmitHandler<IRegisterData>;
  handleSubmit:
    | UseFormHandleSubmit<ILoginData, undefined>
    | UseFormHandleSubmit<IRegisterData, undefined>;
}

export interface IFormItemProps {
  type: string;
  placeholder: string;
  error: FieldError | undefined;
  value?: string;
  onBlur: Noop;
  onChange: (...event: any[]) => void;
}

export interface IAuthLinkProps {
  text: string;
  href: string;
  hrefText: string;
}
