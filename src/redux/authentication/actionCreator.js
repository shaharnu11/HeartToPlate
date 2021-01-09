import Cookies from 'js-cookie';
import { notification } from 'antd';
import actions from './actions';
import firebase, { auth } from '../../config/database/firebase';

const { loginBegin, loginSuccess, loginErr, logoutBegin, logoutSuccess, logoutErr } = actions;

const login = (userName, password) => {
  return async dispatch => {
    try {
      dispatch(loginBegin());
      auth
        .signInWithEmailAndPassword(userName, password)
        .then(_ => {
          setTimeout(() => {
            Cookies.set('logedIn', true);
            return dispatch(loginSuccess(true));
          }, 1000);
        })
        .catch(error => {
          notification.error(error);
          dispatch(loginErr(error));
        });
    } catch (err) {
      dispatch(loginErr(err));
    }
  };
};

const logOut = () => {
  return async dispatch => {
    try {
      dispatch(logoutBegin());
      firebase
        .auth()
        .signOut()
        .then(() => {
          Cookies.remove('logedIn');
          dispatch(logoutSuccess(null));
        })
        .catch(error => {
          dispatch(logoutErr(error));
        });
    } catch (err) {
      dispatch(logoutErr(err));
    }
  };
};

export { login, logOut };
