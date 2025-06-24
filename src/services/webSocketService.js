// import store from '../Redux/Store/Store';
// import {
//   webSocketError,
//   webSocketClosed,
//   updateWebSocketStatus,
//   updateConnectionStatus,
// } from '../Redux/slices/PassengerSlice';
// import HandleResponces from '../utils/handleServerResponses/HandleResponses';
// import errorHandler from '../utils/errorHandler/errorHandler';
// import decodeJWT from '../utils/JWTDecoder/JWTDecoder';
// import API_URL_AXIOS from './AxiosServices';

// let webSocket;
// let retryCount = 0;
// const maxRetries = 5; // Maximum number of retry attempts
// const retryDelay = 2000; // Delay between retries in milliseconds (e.g., 2 seconds)

// export const initializeWebSocket = async token => {
//   try {
//     if (!token) return 'login first';
//     const decodedData = decodeJWT(token);
//     const phoneNumber = decodedData?.data?.phoneNumber;
//     webSocket = new WebSocket(
//       `${API_URL_AXIOS}?user=passenger&phoneNumber=${phoneNumber}&token=Bearer%20${token}`,
//     );

//     webSocket.onopen = () => {
//       console.log('WebSocket connection established');
//       store.dispatch(updateWebSocketStatus(true));
//       retryCount = 0; // Reset retry count on successful connection
//       store.dispatch(
//         updateConnectionStatus({isWSConnected: true, isHTTPConnected: true}),
//       );
//     };

//     webSocket.onmessage = event => {
//       try {
//         const connectionMessage = JSON.parse(event.data)?.message;
//         console.log('@connectionMessage', connectionMessage?.data);
//         if (connectionMessage?.data == 'you are not authorized')
//           throw new Error('you are not authorized');
//         if (
//           connectionMessage?.data ===
//           'Socket connection created successfully for user passenger'
//         )
//           return;
//         console.log('@message on ws', event.data);
//         const response = JSON.parse(event.data);

//         if (response) {
//           HandleResponces(response?.message, 'webSocketService');
//         }
//       } catch (error) {
//         console.log('error in webSocketService', error);
//         errorHandler(error);
//       }
//     };

//     webSocket.onerror = error => {
//       errorHandler(error);
//       store.dispatch(webSocketError({message: error?.message}));
//     };

//     webSocket.onclose = () => {
//       store.dispatch(webSocketClosed());
//       if (retryCount < maxRetries) {
//         retryCount++;
//         setTimeout(() => {
//           initializeWebSocket(); // Retry connection
//         }, retryDelay);
//       } else {
//         store.dispatch(
//           updateConnectionStatus({
//             isWSConnected: false,
//             isHTTPConnected: false,
//           }),
//         );
//         console.log('Max retries reached. WebSocket connection failed.');
//       }
//     };
//     return webSocket?.readyState;
//   } catch (error) {
//     errorHandler(error);
//     console.log('error in initializeWebSocket ', error);
//     if (retryCount < maxRetries) {
//       retryCount++;
//       setTimeout(() => {
//         initializeWebSocket(); // Retry connection
//       }, retryDelay);
//     } else {
//       store.dispatch(webSocketError({message: error.message}));
//       store.dispatch(
//         updateConnectionStatus({isWSConnected: false, isHTTPConnected: false}),
//       );
//       console.log('Max retries reached. Initialization failed.');
//     }
//   }
// };

// export const sendMessage = message => {
//   if (webSocket && webSocket?.readyState === WebSocket?.OPEN) {
//     webSocket?.send(message);
//   } else {
//     console.error('WebSocket is not open. ReadyState: ', webSocket?.readyState);
//   }
// };

// export const closeWebSocket = () => {
//   if (webSocket) {
//     webSocket.close();
//   }
// };
