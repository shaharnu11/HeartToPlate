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

const readGroupFilters = () => {
  return async (dispatch, getState, { getFirestore }) => {
    const db = getFirestore();
    try {
      await dispatch(readGroupFiltersActions.begin());

      const querySnapshot = await db
        .collection('Filters')
        .doc('GroupFilters')
        .get();
      await dispatch(readGroupFiltersActions.success(querySnapshot.data()));
    } catch (err) {
      await dispatch(readGroupFiltersActions.error(err));
      await updateNotificationError(err);
    }
  };
};

// filteredElderId,
// filteredVolunteerId,
// filteredGroupManagerId,
// const readElders = async (db, elderIds) => {
//   const eldars = [];

//   if (elderIds.length != 0 ) {
//     const snapshot = await db
//       .collection('Elders')
//       .where(db.FieldPath.documentId(), 'in', elderIds)
//       .get();

//     snapshot.forEach(doc => {
//       eldars.push(doc.data());
//       // elderIdToElderMap[data.id] = data;
//     });
//   }
//   return eldars;
// };

const readGroups = (filters, pageLimit) => {
  return async (dispatch, getState, { getFirestore }) => {
    const db = getFirestore();
    try {
      const groups = [];
      await dispatch(readGroupActions.begin());

      const groupsRef = await db.collection('Groups');
      let query = groupsRef;
      if (filters.filteredCity !== undefined) {
        query = query.where('city', '==', filters.filteredCity);
      }

      if (filters.filteredElderId !== undefined) {
        query = query.where('elders', 'array-contains', filters.filteredElderId);
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

      await Promise.all(promiss);

      await dispatch(readGroupActions.success(groups));
    } catch (err) {
      await dispatch(readGroupActions.error(err));
      await updateNotificationError(err);
    }
  };
};

// querySnapshot.forEach(doc => {
//   if (doc.exists) {
//     const groupManager = doc.data();
//     groupManagersFilter.push({
//       firstName: groupManager.firstName,
//       lastName: groupManager.lastName,
//       id: groupManager.id,
//     });
//   } else {
//     updateNotificationError('readGroupManagers -No such document!');
//   }

// const read = (pagination, sorter, joinColumns, filter) => {
//   return async (dispatch, getState, { getFirestore }) => {
//     const db = getFirestore();
//     const datas = [];
//     try {
//       await dispatch(fbReadBegin());

//       let collectionRef = db.collection(collectionName);

//       if (filter != null) {
//         collectionRef = collectionRef.where(filter.column, '>=', filter.text);
//       }
//       if (sorter != null) {
//         collectionRef = collectionRef.orderBy(sorter.columnKey, sorter.order === 'ascend' ? 'asc' : 'desc');
//       }
//       if (pagination != null) {
//         collectionRef = collectionRef.limit(pagination.pageSize * pagination.current + 1);
//       }
//       await collectionRef.get().then(query =>
//         query.forEach(doc => {
//           datas.push(doc.data());
//         }),
//       );

//       if (joinColumns.length > 0) {
//         const promiss = [];
//         datas.forEach(data => {
//           joinColumns.forEach(joinColumn => {
//             if (joinColumn.action === 'in' && data[joinColumn.sourceColumn].length === 0) {
//               return;
//             }

//             // title: 'Groups',
//             // dataIndex: 'groups',
//             // key: 'groups',
//             // joinCollection: 'Groups',
//             // sourceColumn: 'groups',
//             // action: 'in',
//             // destinationColumn: 'id',

//             promiss.push(
//               db
//                 .collection(joinColumn.joinCollection)
//                 .where(joinColumn.destinationColumn, joinColumn.action, data[joinColumn.sourceColumn])
//                 .get()
//                 .then(query => {
//                   const newVal = [];
//                   query.forEach(doc => {
//                     newVal.push(doc.data());
//                   });
//                   data[joinColumn.key] = newVal;
//                 }),
//             );
//           });
//         });

//         await Promise.all(promiss);
//       }

//       await dispatch(fbReadSuccess(collection, datas));
//     } catch (err) {
//       await dispatch(fbReadErr(err));
//       await updateNotificationError(err);
//     }
//   };
// };

export { readGroupFilters, readGroups };

