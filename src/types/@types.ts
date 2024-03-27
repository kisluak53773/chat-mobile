import { Dispatch, SetStateAction } from 'react';

export interface IUser {
  email: string;
}

export interface IGlobalContext {
  currUser: IUser | null;
  setCurrUser: Dispatch<SetStateAction<IUser | null>>;
}
