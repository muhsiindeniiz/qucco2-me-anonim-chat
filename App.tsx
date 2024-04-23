import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import Toast from 'react-native-toast-message';
import {InitialFirebase} from './src/db/Firebase/config';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {storage} from './src/constants/app';

const App = () => {
  storage.delete('email');
  storage.delete('password');
  storage.delete('gender');
  storage.delete('username');
  storage.delete('about');
  storage.delete('photo');

  InitialFirebase();
  return (
    <Provider store={store}>
      <RootNavigator />
      <Toast />
    </Provider>
  );
};

export default App;
