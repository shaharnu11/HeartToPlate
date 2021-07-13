import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import firebase, { storage } from 'firebase';
import logger from 'redux-logger'

import { getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore, createFirestoreInstance } from 'redux-firestore';
import rootReducer from './rootReducers';
import fbConfig from '../config/database/firebase';


const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore, storage })];
 
if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
 
  middlewares.push(logger);
}
 

const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares), reduxFirestore(fbConfig)),
);

export const rrfProps = {
  firebase,
  config: (fbConfig, { useFirestoreForProfile: true, userProfile: 'users', attachAuthIsReady: true }),
  dispatch: store.dispatch,
  createFirestoreInstance,
};

export default store;
