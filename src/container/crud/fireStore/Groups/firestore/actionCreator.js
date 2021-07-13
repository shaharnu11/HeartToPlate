/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
// import { filter } from 'all-the-cities';
import { notification } from 'antd';
import actions from './actions';

const addNotificationSuccess = () => {
  notification.success({
    message: 'Your Record hasbeen Submited',
  });
};

const addNotificationError = err => {
  notification.error({
    message: err,
  });
};

const deleteNotificationSuccess = () => {
  notification.success({
    message: 'Your Record hasbeen Deleted',
  });
};

const deleteNotificationError = err => {
  notification.error({
    message: err,
  });
};

const updateNotificationSuccess = () => {
  notification.success({
    message: 'Your Record hasbeen updated',
  });
};

const updateNotificationError = err => {
  console.log(err);
  notification.error({
    message: err,
  });
};

const { readGroupFiltersActions, readGroupActions } = actions;

export const readGroupFilters = () => {
  return async (dispatch, getState, { getFirestore }) => {
    const db = getFirestore();
    try {
      await dispatch(readGroupFiltersActions.begin());

      const filters = {};
      const querySnapshot = await db.collection('Filters').get();
      querySnapshot.forEach(doc => {
        const data = doc.data();
        filters[doc.id] = data.filter;
      });

      await dispatch(readGroupFiltersActions.success(filters));
    } catch (err) {
      await dispatch(readGroupFiltersActions.error(err));
      await updateNotificationError(err);
    }
  };
};

export const readGroups = (filters, pageLimit) => {
  return async (dispatch, getState, { getFirestore }) => {
    const db = getFirestore();
    try {
      const groups = [];
      await dispatch(readGroupActions.begin());

      // Create Filters
      // const temp = {};
      // const snapshotasd = await db.collection('Groups').get();
      // snapshotasd.forEach(async doc => {
      //   const data = doc.data();
      //   console.log(data.id);
      //   await db
      //     .collection('Groups')
      //     .doc(data.id.toString())
      //     .update({ status: 'Pending' });

      //   // await db.ref(`Groups/${data.id}`).set({
      //   //   status: 'active',
      //   // });
      //   // const data = doc.data();
      //   // temp[data.id] = data.firstName + data.lastName;
      // });

      // console.log(temp);
      // await db
      //   .collection('Filters')
      //   .doc('ElderIdToDisplayName')
      //   .set({
      //     filter: temp,
      //   });

      const groupsRef = await db.collection('Groups');
      let query = groupsRef;

      if (filters.filteredCity !== undefined) {
        query = query.where('city', '==', filters.filteredCity);
      }

      if (filters.filteredElderId !== undefined) {
        query = query.where('elders', 'array-contains', Number(filters.filteredElderId));
      }

      if (filters.filteredGroupManagerId !== undefined) {
        query = query.where('groupManager', '==', Number(filters.filteredGroupManagerId));
      }

      if (filters.filteredGroupStatus !== undefined) {
        query = query.where('status', '==', filters.filteredGroupStatus);
      }

      if (filters.filteredOrganizationId !== undefined) {
        query = query.where('organizations', 'array-contains', Number(filters.filteredOrganizationId));
      }

      if (filters.filteredVolunteerId !== undefined) {
        query = query.where('volunteers', 'array-contains', Number(filters.filteredVolunteerId));
      }

      query = query.limit(pageLimit); // TODO: set limit using pagination

      const snapshot = await query.get();
      snapshot.forEach(doc => {
        groups.push(doc.data());
      });

      const promiss = [];

      groups.forEach(group => {
        if (group.elders.length) {
          promiss.push(
            db
              .collection('Elders')
              .where(
                db.FieldPath.documentId(),
                'in',
                group.elders.map(elderId => elderId.toString()),
              )
              .get()
              .then(_ => {
                const elders = [];
                _.forEach(doc => {
                  elders.push(doc.data());
                });
                group.elders = elders;
              }),
          );
        }
      });

      groups.forEach(group => {
        if (group.volunteers.length) {
          promiss.push(
            db
              .collection('Volunteers')
              .where(
                db.FieldPath.documentId(),
                'in',
                group.volunteers.map(volunteerId => volunteerId.toString()),
              )
              .get()
              .then(_ => {
                const elders = [];
                _.forEach(doc => {
                  elders.push(doc.data());
                });
                group.volunteers = elders;
              }),
          );
        }
      });

      groups.forEach(group => {
        if (group.groupManager) {
          promiss.push(
            db
              .collection('GroupManagers')
              .doc(group.groupManager.toString())
              .get()
              .then(_ => {
                group.groupManager = _.data();
              }),
          );
        }
      });

      await Promise.all(promiss);

      await dispatch(readGroupActions.success(groups));
    } catch (err) {
      await dispatch(readGroupActions.error(err));
      await updateNotificationError(err);
    }
  };
};

// Create Filters
// const temp = {};
// const snapshotasd = await db.collection('Elders').get();
// snapshotasd.forEach(doc => {
//   const data = doc.data();
//   temp[data.id] = data.firstName + data.lastName;
// });

// console.log(temp);
// await db
//   .collection('Filters')
//   .doc('ElderIdToDisplayName')
//   .set({
//     filter: temp,
//   });
