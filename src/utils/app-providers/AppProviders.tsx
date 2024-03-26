import store from '../../redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebase/firebase';

initializeApp(firebaseConfig);
const persistor = persistStore(store);

const AppProviders = ({children}: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default AppProviders;