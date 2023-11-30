// import { createContext, useContext, useEffect, useReducer } from 'react';
// import reducer from './reducer';

// interface ContextProviderProps {
//   children: React.ReactNode;
// }

// interface ContextState {
//   openLogin: boolean;
//   loading: boolean;
//   alert: { open: boolean; severity: 'info' | 'error' | 'warning' | 'success'; message: string };
//   // profile: { open: boolean; file: null | File; photoURL: string };
//   // currentUser: null | any;
//   images: string[];
//   details: { title: string; description: string; price: number };
//   location: { lng: number; lat: number };
//   hotelDetails: {
//     id: string;
//     title: string;
//     description: string;
//     price: number;
//     images: string[];
//     location: { lng: number; lat: number }; 
//   } | null;
// }

// const initialState: ContextState = {
//   openLogin: false,
//   loading: false,
//   alert: { open: false, severity: 'info', message: '' },
//   // profile: { open: false, file: null, photoURL: '' },
//   // currentUser: null,
//   images: [],
//   details: { title: '', description: '', price: 0 },
//   location: { lng: 0, lat: 0 },
//   hotelDetails: null,
// };

// const Context = createContext<{ state: ContextState; dispatch: React.Dispatch<any> }>({ state: initialState, dispatch: () => null });

// export const useValue = () => {
//   return useContext(Context);
// };

// const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   useEffect(() => {
//     // Fetch hotel details or initialize as needed
//     const initialHotelDetails = {
//       id: 'hotel-1',
//       title: 'Sample Hotel',
//       description: 'A sample hotel description.',
//       price: 100,
//       images: ['image1.jpg', 'image2.jpg'],
//       location: { lng: 0, lat: 0 },
//     };

//     dispatch({ type: 'SET_HOTEL_DETAILS', payload: initialHotelDetails });
//   }, []);

//   return (
//     <Context.Provider value={{ state, dispatch }}>
//       {children}
//     </Context.Provider>
//   );
// };

// export default ContextProvider;



import { createContext, useContext, useEffect, useReducer } from 'react';
import reducer from './reducer';

interface ContextProviderProps {
  children: React.ReactNode;
}

interface ContextState {
  openLogin: boolean;
  loading: boolean;
  alert: { open: boolean; severity: 'info' | 'error' | 'warning' | 'success'; message: string };
  images: string[];
  details: {
    hotelName: string;
    location: string;
    contactNo: string;
    emailAddress: string;
    minRent: number;
    amenities: string[];
    description: string;
  };
  location: { lng: number; lat: number };
  hotelDetails: {
    id: string;
    hotelName: string;
    location: string;
    contactNo: string;
    emailAddress: string;
    minRent: number;
    amenities: string[];
    description: string;
    images: string[];
  } | null;
}

const initialState: ContextState = {
  openLogin: false,
  loading: false,
  alert: { open: false, severity: 'info', message: '' },
  images: [],
  details: {
    hotelName: '',
    location: '',
    contactNo: '',
    emailAddress: '',
    minRent: 0,
    amenities: [],
    description: '',
  },
  location: { lng: 0, lat: 0 },
  hotelDetails: null,
};

const Context = createContext<{ state: ContextState; dispatch: React.Dispatch<any> }>({ state: initialState, dispatch: () => null });

export const useValue = () => {
  return useContext(Context);
};

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialHotelDetails = {
      id: 'hotel-1',
      hotelName: 'Sample Hotel',
      location: 'Sample Location',
      contactNo: '123-456-7890',
      emailAddress: 'sample@email.com',
      minRent: 100,
      amenities: ['Wifi', 'Parking'],
      description: 'A sample hotel description.',
      images: ['image1.jpg', 'image2.jpg'],
    };

    dispatch({ type: 'SET_HOTEL_DETAILS', payload: initialHotelDetails });
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
