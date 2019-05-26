import React, { Component } from 'react';
import { AsyncStorage } from  'react-native';
import { compose, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { Provider } from 'react-redux';
import Router from './Router';
import reducers from './reducers';

class App extends Component {
  render() {
    const store = createStore(
        reducers,
        applyMiddleware(thunk),
        compose(autoRehydrate())
    );

    persistStore(store, {
      storage: AsyncStorage,
      whitelist: [ 'alarms', 'lastSettings' ]
    });

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
