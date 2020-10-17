import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import firebase, { storage } from 'firebase';

import { getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore, createFirestoreInstance } from 'redux-firestore';
import rootReducer from './rootReducers';
import fbConfig from '../config/database/firebase';

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore, storage })), reduxFirestore(fbConfig)),
);

export const rrfProps = {
  firebase,
  config: (fbConfig, { useFirestoreForProfile: true, userProfile: 'users', attachAuthIsReady: true }),
  dispatch: store.dispatch,
  createFirestoreInstance,
};

export default store;
