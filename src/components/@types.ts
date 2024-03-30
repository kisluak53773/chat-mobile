import { User } from 'firebase/auth';
import { type IContact } from '@/hooks';

export interface IAvatarProps {
  user: User | IContact;
  small?: boolean;
}

//TODO: remove any
export interface IContactItemProps {
  type?: string;
  image?: string;
  user: User | IContact;
  room?: any;
  time?: any;
  description?: string;
}
