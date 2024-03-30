import {
  createContext,
  FC,
  PropsWithChildren,
  useState,
  useContext,
} from 'react';
import { type IGlobalContext, IRoom } from '@/types';
import { type User } from 'firebase/auth';
import { type IContact } from '@/hooks';

const GlobalContext = createContext(null);

export const ContextWrapper: FC<PropsWithChildren> = ({ children }) => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [unfilteredRooms, setUnfilteredRooms] = useState<IRoom[]>([]);
  const [companion, setCompanion] = useState<User | IContact | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<IRoom>(null);
  const [image, setImage] = useState<string>(null);

  return (
    <GlobalContext.Provider
      value={{
        rooms,
        setRooms,
        unfilteredRooms,
        setUnfilteredRooms,
        companion,
        setCompanion,
        selectedRoom,
        setSelectedRoom,
        image,
        setImage,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const value = useContext<IGlobalContext>(GlobalContext);

  if (!value)
    throw new Error(
      'You need to wrap component in global context provider to use its value'
    );

  return value;
};
