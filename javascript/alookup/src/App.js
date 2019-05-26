import React from 'react';
import { AppWithRouter } from './AppWithRouter';
import { Provider } from 'react-redux'
import { Store, Persistor } from './state'
import { PersistGate } from 'redux-persist/integration/react'

function App() {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistor}>
        <AppWithRouter />
      </PersistGate>
    </Provider>
  );
}

export default App;
