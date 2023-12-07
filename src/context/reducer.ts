// interface State {
//     openLogin: boolean;
//     loading: boolean;
//     alert: { open: boolean; severity: 'info' | 'error' | 'warning' | 'success'; message: string };

//     images: string[];
//     details: { title: string; description: string; price: number };
//     location: { lng: number; lat: number };
//     hotelDetails: any; 
//   }
  
//   type Action =

//     | { type: 'START_LOADING' }
//     | { type: 'END_LOADING' }
//     | { type: 'UPDATE_ALERT'; payload: State['alert'] }

//     | { type: 'UPDATE_IMAGES'; payload: string }
//     | { type: 'DELETE_IMAGE'; payload: string }
//     | { type: 'UPDATE_DETAILS'; payload: Partial<State['details']> }
//     | { type: 'UPDATE_LOCATION'; payload: State['location'] }
//     | { type: 'SET_HOTEL_DETAILS'; payload: State['hotelDetails'] };
  
//   const reducer = (state: State, action: Action): State => {
//     switch (action.type) {
  
//       case 'START_LOADING':
//         return { ...state, loading: true };
//       case 'END_LOADING':
//         return { ...state, loading: false };
  
//       case 'UPDATE_ALERT':
//         return { ...state, alert: action.payload };
  
//       case 'UPDATE_IMAGES':
//         return { ...state, images: [...state.images, action.payload] };
//       case 'DELETE_IMAGE':
//         return {
//           ...state,
//           images: state.images.filter((image) => image !== action.payload),
//         };
//       case 'UPDATE_DETAILS':
//         return { ...state, details: { ...state.details, ...action.payload } };
//       case 'UPDATE_LOCATION':
//         return { ...state, location: action.payload };
  
//       case 'SET_HOTEL_DETAILS':
//         return { ...state, hotelDetails: action.payload };
  
//       default:
//         throw new Error('No matched action!');
//     }
//   };
  
//   export default reducer;
  


// reducer.ts

interface State {
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
const initialState: State = {
  openLogin: false,
  loading: false,
  alert: { open: false, severity: 'info', message: '' },
  images: [],
  details: {
    hotelName: '',
    location: '',
    contactNo: '',
    emailAddress: '',
    minRent: 100,
    amenities: [],
    description: '',
  },
  location: { lng: 0, lat: 0 },
  hotelDetails: null,
};


type Action =
  | { type: 'START_LOADING' }
  | { type: 'END_LOADING' }
  | { type: 'UPDATE_ALERT'; payload: State['alert'] }
  | { type: 'UPDATE_IMAGES'; payload: string }
  | { type: 'DELETE_IMAGE'; payload: string }
  | { type: 'UPDATE_DETAILS'; payload: Partial<State['details']> }
  | { type: 'UPDATE_LOCATION'; payload: State['location'] }
  | { type: 'SET_HOTEL_DETAILS'; payload: State['hotelDetails'] }
  | { type: 'RESET_HOTEL_STATE' };


const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, loading: true };
    case 'END_LOADING':
      return { ...state, loading: false };
    case 'UPDATE_ALERT':
      return { ...state, alert: action.payload };
    case 'UPDATE_IMAGES':
      return { ...state, images: [...state.images, action.payload] };
    case 'DELETE_IMAGE':
      return {
        ...state,
        images: state.images.filter((image) => image !== action.payload),
      };
    case 'UPDATE_DETAILS':
      return { ...state, details: { ...state.details, ...action.payload } };
    case 'UPDATE_LOCATION':
      return { ...state, location: action.payload };
    case 'SET_HOTEL_DETAILS':
      return { ...state, hotelDetails: action.payload };
      case 'RESET_HOTEL_STATE':
        return initialState;
    default:
      throw new Error('No matched action!');
  }
};

export default reducer;
