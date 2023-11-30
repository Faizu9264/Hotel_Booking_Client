// // src/services/hotelApi.ts

// import axios from 'axios';

// const BASE_URL = 'http://localhost:5000'; 

// const hotelApi = {
//   createHotel: async (hotelDetails: any) => {
//     try {
//       const response = await axios.post(`${BASE_URL}/hotel/create`, hotelDetails, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         withCredentials: true, 
//       });

//       return response.data;
//     } catch (error:any) {
//       throw new Error(error.message);
//     }
//   },
// };

// export default hotelApi;
