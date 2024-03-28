import { User } from 'firebase/auth';
import { type IContact } from '@/hooks';

export interface IAvatarProps {
  user: any;
}

//TODO: remove any
export interface IContactItemProps {
  type?: string;
  image?: string;
  user: any;
  room?: any;
  time?: string;
  description?: string;
}
