import { IUser } from '@/types';
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
  const [currUser, setCurrUser] = useState<IUser | null>(null);

  return (
    <GlobalContext.Provider value={{ currUser, setCurrUser }}>
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
