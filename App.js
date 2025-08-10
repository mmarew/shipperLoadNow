import { enableScreens } from 'react-native-screens';

import AppNavigator from './src/Navigation/AppNavigator';
import { Provider } from 'react-redux';
import store from './src/Redux/Store/Store';
import Toast from 'react-native-toast-message';
import { enableScreens } from 'react-native-screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
enableScreens();
import { ErrorBoundary } from 'react-error-boundary';

import 'react-native-get-random-values';
const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AppNavigator />
          <Toast />
        </GestureHandlerRootView>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
