import {
  createContext,
  FC,
  PropsWithChildren,
  useState,
  useContext,
} from 'react';
import { type IGlobalContext } from '@/types';

const GlobalContext = createContext(null);

export const ContextWrapper: FC<PropsWithChildren> = ({ children }) => {
  const [rooms, setRooms] = useState<any>([]);
  const [unfilteredRooms, setUnfilteredRooms] = useState([]);

  return (
    <GlobalContext.Provider
      value={{ rooms, setRooms, unfilteredRooms, setUnfilteredRooms }}>
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
