/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
// import { filter } from 'all-the-cities';
import { notification } from 'antd';
import actions from './actions';

const addNotificationError = err => {
  notification.error({
    message: err,
  });
};
const { readOrganizationActions } = actions;

export const readOrganizations = () => {
  return async (dispatch, getState, { getFirestore }) => {
    const db = getFirestore();
    try {
      const organizations = [];
      await dispatch(readOrganizationActions.begin());
      
      const query = await db.collection('Organizations');

      const snapshot = await query.get();
      snapshot.forEach(doc => {
        organizations.push(doc.data());
      });
      console.log("we are dispaching organizations");
      await dispatch(readOrganizationActions.success(organizations));
      console.log("this is organizations after dispatch" + organizations);
      
    } catch (err) {
      await dispatch(readOrganizationActions.error(err));
      await addNotificationError(err);
    }
  };
};
