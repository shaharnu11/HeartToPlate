/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
// import { filter } from 'all-the-cities';
import { notification } from 'antd';
import actions from './actions';

const updateNotificationError = err => {
  notification.error({
    message: err,
  });
};

const { readFiltersActions } = actions;

export const readFilters = () => {
  return async (dispatch, getState, { getFirestore }) => {
    const db = getFirestore();
    try {
      await dispatch(readFiltersActions.begin());

      const filters = {};
      const querySnapshot = await db.collection('Filters').get();
      querySnapshot.forEach(doc => {
        const data = doc.data();
        filters[doc.id] = data.filter;
      });

      await dispatch(readFiltersActions.success(filters));
    } catch (err) {
      await dispatch(readFiltersActions.error(err));
      await updateNotificationError(err);
    }
  };
};
