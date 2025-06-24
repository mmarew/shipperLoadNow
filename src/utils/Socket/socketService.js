import {io} from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import decodeJWT from '../JWTDecoder/JWTDecoder';
import API_URL_AXIOS from '../../services/AxiosServices';
import store from '../../Redux/Store/Store';
import {
  setIsLoading,
  updateConnectionStatus,
} from '../../Redux/slices/PassengerSlice';

let socket = null;
let retryCount = 0;
const MAX_RETRIES = 5;
let connectionTimer = null;

// Helper functions
const getSocket = () => socket;

const isSocketConnected = () => {
  return socket?.connected || false;
};

const removeAllListeners = () => {
  if (socket) {
    socket.off(); // Removes all listeners
  }
};

const clearHeartbeat = () => {
  if (connectionTimer) {
    clearInterval(connectionTimer);
    connectionTimer = null;
  }
};

const getSocketUrl = async () => {
  try {
    const token = await AsyncStorage.getItem('passengersToken');
    if (!token) {
      throw new Error('No token found');
    }

    const validateData = decodeJWT(token)?.data || {};
    const phoneNumber = validateData?.phoneNumber;

    if (!phoneNumber) {
      store.dispatch(updateConnectionStatus({isWSConnected: false}));
      throw new Error('Please add your phone number in your profile');
    }

    return `${API_URL_AXIOS}?user=passenger&phoneNumber=${phoneNumber}&token=Bearer%20${token}`;
  } catch (error) {
    console.error('⚠️ Error in getSocketUrl:', error.message);
    return null;
  }
};

const initSocket = async () => {
  try {
    if (socket && socket.connected) {
      console.log('✅ Socket already connected');
      store.dispatch(updateConnectionStatus({isWSConnected: true}));
      return socket;
    }

    store.dispatch(setIsLoading(true));

    const SOCKET_URL = await getSocketUrl();
    if (!SOCKET_URL) {
      store.dispatch(setIsLoading(false));
      console.warn('⚠️ Socket URL is invalid. Connection aborted.');
      return null;
    }

    // Clean up existing connection if any
    if (socket) {
      socket.disconnect();
      removeAllListeners();
      clearHeartbeat();
    }

    socket = io(SOCKET_URL, {
      transports: ['websocket'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: MAX_RETRIES,
      reconnectionDelay: 2000,
      reconnectionDelayMax: 5000,
      timeout: 5000, // Reduced timeout
      forceNew: true,
      upgrade: false,
      rejectUnauthorized: false,
      perMessageDeflate: false,
    });

    // Connection established
    socket.on('connect', () => {
      retryCount = 0;
      store.dispatch(updateConnectionStatus({isWSConnected: true}));
      store.dispatch(setIsLoading(false));
      console.log('✅ Connected to WebSocket');

      // Setup heartbeat
      clearHeartbeat();
      connectionTimer = setInterval(() => {
        if (socket.connected) {
          socket.emit('heartbeat', {timestamp: Date.now()});
        }
      }, 30000); // 30s heartbeat
    });

    socket.on('disconnect', reason => {
      console.warn('❌ Disconnected from WebSocket:', reason);
      store.dispatch(updateConnectionStatus({isWSConnected: false}));
      clearHeartbeat();

      // Manual reconnection trigger can be added here for specific cases
      if (reason === 'transport close' || reason === 'ping timeout') {
        // Immediate reconnection attempt for these cases
        setTimeout(() => {
          if (!socket.connected && retryCount < MAX_RETRIES) {
            socket.connect();
          }
        }, 1000);
      }
      retryCount++;
    });

    // Reconnection events
    socket.on('reconnect_attempt', () => {
      console.log(`🔄 Reconnect attempt (${retryCount}/${MAX_RETRIES})`);
      store.dispatch(setIsLoading(true));
    });

    socket.on('reconnect_failed', () => {
      console.warn('🚫 Reconnection failed. No more attempts.');
      store.dispatch(setIsLoading(false));
      store.dispatch(updateConnectionStatus({isWSConnected: false}));
      clearHeartbeat();
    });

    // Error handling
    socket.on('error', error => {
      console.error('⚠️ WebSocket Error:', error);
      store.dispatch(setIsLoading(false));
      store.dispatch(updateConnectionStatus({isWSConnected: false}));
    });

    // Ping/pong for connection health
    socket.on('ping', () => {
      console.debug('🏓 Received ping from server');
    });

    socket.on('pong', latency => {
      console.debug('🏓 Received pong from server', latency);
    });

    return socket;
  } catch (error) {
    store.dispatch(setIsLoading(false));
    store.dispatch(updateConnectionStatus({isWSConnected: false}));
    console.error('⚠️ Error in initSocket:', error);
    return null;
  }
};
// unused but to be used
const reconnectSocket = async () => {
  try {
    if (socket?.connected) {
      console.log('✅ Socket already connected');
      return true;
    }

    store.dispatch(setIsLoading(true));
    retryCount = 0; // Reset retry counter

    if (socket) {
      // Socket exists but disconnected
      socket.connect();
    } else {
      // No socket instance, initialize fresh
      await initSocket();
    }

    return true;
  } catch (error) {
    console.error('⚠️ Reconnection failed:', error);
    store.dispatch(setIsLoading(false));
    return false;
  }
};

const disconnectSocket = () => {
  try {
    if (!socket) {
      console.warn('⚠️ No WebSocket instance exists.');
      return;
    }

    if (socket.connected) {
      removeAllListeners();
      socket.disconnect();
      console.log('🚫 WebSocket disconnected');
    }

    clearHeartbeat();
    store.dispatch(updateConnectionStatus({isWSConnected: false}));
    store.dispatch(setIsLoading(false));
  } catch (error) {
    console.error('⚠️ Error in disconnectSocket:', error);
  }
};
// not used yet  but to be used on live update of location to driver and passenger
const emitEvent = (event, data) => {
  try {
    if (!socket || !socket.connected) {
      store.dispatch(updateConnectionStatus({isWSConnected: false}));
      console.warn('⚠️ Cannot emit, socket is not connected!');
      return false;
    }

    if (!event || !data) {
      console.error('⚠️ Event name and data are required.');
      return false;
    }

    console.log(`📤 Emitting event: ${event}`, data);
    socket.emit(event, data);
    return true;
  } catch (error) {
    console.error('⚠️ Error in emitEvent:', error);
    return false;
  }
};

const listenToEvent = (event, callback) => {
  try {
    if (!socket) {
      store.dispatch(updateConnectionStatus({isWSConnected: false}));
      console.warn('⚠️ Socket is not initialized yet.');
      return false;
    }

    console.log(`🔔 Listening for event: ${event}`);
    socket.off(event); // Remove previous listener
    socket.on(event, callback);
    return true;
  } catch (error) {
    console.error('⚠️ Error in listenToEvent:', error);
    return false;
  }
};

// Export helper functions
export {
  reconnectSocket,
  emitEvent,
  initSocket,
  disconnectSocket,
  listenToEvent,
  getSocket,
  isSocketConnected,
};
