/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import '../styles/globals.css'
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  const persistor = persistStore(store);
  return (
    <div>
      <ChakraProvider>
      <Provider store={store}>
      <PersistGate persistor={persistor}>
      <Component {...pageProps} />
      </PersistGate>
      </Provider>
      </ChakraProvider>
    </div>
  );
}

export default MyApp;
