import React from 'react';
import { hydrate } from 'react-dom';
import App from './app';
import { Provider } from 'react-redux'
import store from '../redux/store'

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
hydrate(<AppWrapper />, document.getElementById("reactele"))
