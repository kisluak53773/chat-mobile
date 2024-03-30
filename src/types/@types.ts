import { Dispatch, SetStateAction } from 'react';
import { type User } from 'firebase/auth';
import { type IContact } from '@/hooks';

export interface IParticipant {
  displayName: string;
  email: string;
}

export interface IRoom {
  id?: string;
  lastMessage: {
    _id: string;
    createdAt: string;
    image?: string;
    text: string;
    user: {
      _id: string;
      name: string;
    };
  };
  participants: IParticipant[];
  participantsArray: string[];
}

export interface IGlobalContext {
  rooms: IRoom[];
  setRooms: Dispatch<SetStateAction<IRoom[]>>;
  unfilteredRooms: IRoom[];
  setUnfilteredRooms: Dispatch<SetStateAction<IRoom[]>>;
  companion: User | IContact;
  setCompanion: Dispatch<SetStateAction<User | IContact>>;
  selectedRoom: IRoom;
  setSelectedRoom: Dispatch<SetStateAction<IRoom>>;
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
}
