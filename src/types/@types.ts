import { Dispatch, SetStateAction } from 'react';

export interface IGlobalContext {
  rooms: any;
  setRooms: Dispatch<SetStateAction<any>>;
  unfilteredRooms: any;
  setUnfilteredRooms: Dispatch<SetStateAction<any>>;
}
