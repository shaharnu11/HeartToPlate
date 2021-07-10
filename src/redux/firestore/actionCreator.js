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
    message: 'Your Record has been updated',
  });
};

const updateNotificationError = err => {
  notification.error({
    message: err,
  });
};

const {
  fbAddBegin,
  fbAddSuccess,
  fbAddErr,

  fbCleanSuccess,

  fbReadBegin,
  fbReadSuccess,
  fbReadErr,

  fbUpdateBegin,
  fbUpdateSuccess,
  fbUpdateErr,

  fbDeleteBegin,
  fbDeleteSuccess,
  fbDeleteErr,

  fbReadFileBegin,
  fbReadFileSuccess,
  fbReadFileErr,

  fbSingleDataBegin,
  fbSingleDataSuccess,
  fbSingleDataErr,

  fbUploadBegin,
  fbUploadSuccess,
  fbUploadErr,

  fbSearchBegin,
  fbSearchSuccess,
  fbSearchErr,
} = actions;

const fbDataSubmit = (collection, data) => {
  return async (dispatch, getState, { getFirestore }) => {
    await dispatch(fbAddBegin());

    const db = getFirestore();
    try {
      await db
        .collection(collection)
        .doc(`${data.id}`)
        .set(data);
      await dispatch(fbAddSuccess(data));
      await addNotificationSuccess();
    } catch (err) {
      await dispatch(fbAddErr(err));
      await addNotificationError(err);
    }
  };
};
/*
{collection : }
*/

const fbDataClean = collection => {
  return async dispatch => {
    await dispatch(fbCleanSuccess(collection));
  };
};
const fbDataRead = (collection, pagination, sorter, joinColumns, filter) => {
  return async (dispatch, getState, { getFirestore }) => {
    const db = getFirestore();
    const datas = [];
    try {
      await dispatch(fbReadBegin());

      let collectionRef = db.collection(collection);

      if (filter != null) {
        collectionRef = collectionRef.where(filter.column, '>=', filter.text);
      }
      if (sorter != null) {
        collectionRef = collectionRef.orderBy(sorter.columnKey, sorter.order === 'ascend' ? 'asc' : 'desc');
      }
      if (pagination != null) {
        collectionRef = collectionRef.limit(pagination.pageSize * pagination.current + 1);
      }
      await collectionRef.get().then(query =>
        query.forEach(doc => {
          datas.push(doc.data());
        }),);

      if (joinColumns.length > 0) {
        const promiss = [];
        datas.forEach(data => {
          joinColumns.forEach(joinColumn => {
            if (joinColumn.action === 'in' && data[joinColumn.sourceColumn].length === 0) {
              return;
            }

            // title: 'Groups',
            // dataIndex: 'groups',
            // key: 'groups',
            // joinCollection: 'Groups',
            // sourceColumn: 'groups',
            // action: 'in',
            // destinationColumn: 'id',

            promiss.push(
              db
                .collection(joinColumn.joinCollection)
                .where(joinColumn.destinationColumn, joinColumn.action, data[joinColumn.sourceColumn])
                .get()
                .then(query => {
                  const newVal = [];
                  query.forEach(doc => {
                    newVal.push(doc.data());
                  });
                  data[joinColumn.key] = newVal;
                }),
            );
          });
        });

        await Promise.all(promiss);
      }

      // Migration
      // const datasTemp = [];
      // await db
      //   .collection(collection)
      //   .get()
      //   .then(query =>
      //     query.forEach(doc => {
      //       datasTemp.push(doc.data());
      //     }),
      //   );

      // await datas.forEach(async _ => {
      //   await db
      //     .collection(collection)
      //     .doc(_.id.toString())
      //     .update({
      //       ..._,
      //       groups: _.groups.map(__ => __.id),
      //     });
      // });

      // const isEndOfCollection = datas.length > pagination.pageSize * pagination.current;

      // if (isEndOfCollection) {
      //   datas.pop();
      //   [...Array(pagination.pageSize).keys()].forEach(_ => {
      //     datas.push(datas[datas.length - 1]);
      //   });
      // }

      await dispatch(fbReadSuccess(collection, datas));
    } catch (err) {
      await dispatch(fbReadErr(err));
      await updateNotificationError(err);
    }
  };
};

const fbDataSearch = (collection, value, keys) => {
  return async (dispatch, getState, { getFirestore }) => {
    const db = getFirestore();
    const data = [];
    try {
      await dispatch(fbSearchBegin());

      const queries = await Promise.all(
        keys.map(async key => {
          return db
            .collection(collection)
            .where(key, '>=', value)
            .get();
        }),
      );

      await Promise.all(
        queries.map(async _ => {
          return _.forEach(doc => {
            data.push(doc.data());
          });
        }),
      );

      const dataIds = data.map(_ => _.id);

      await dispatch(
        fbSearchSuccess(
          collection,
          data.filter((val, index) => dataIds.indexOf(val.id) === index),
        ),
      );
    } catch (err) {
      await dispatch(fbSearchErr(err));
    }
  };
};

const fbDataUpdate = (collection, id, data) => {
  return async (dispatch, getState, { getFirestore }) => {
    const db = getFirestore();
    try {
      await dispatch(fbUpdateBegin());
      await db
        .collection(collection)
        .doc(`${id}`)
        .update({
          ...data,
        });

      const query = await db
        .collection(collection)
        .where('id', '==', id)
        .get();
      await query.forEach(doc => {
        dispatch(fbUpdateSuccess(doc.data()));
      });

      await updateNotificationSuccess();
    } catch (err) {
      await dispatch(fbUpdateErr(err));
      await updateNotificationError(err);
    }
  };
};

const fbDataDelete = (collection, id) => {
  return async (dispatch, getState, { getFirestore }) => {
    const db = getFirestore();
    const data = [];
    try {
      await dispatch(fbDeleteBegin());
      await db
        .collection(collection)
        .doc(`${id}`)
        .delete();
      const query = await db.collection(collection).get(); // shahar fix
      await query.forEach(doc => {
        data.push(doc.data());
      });
      await dispatch(fbDeleteSuccess(data));
      await deleteNotificationSuccess();
      await fbDataRead();
    } catch (err) {
      await dispatch(fbDeleteErr(err));
      await deleteNotificationError(err);
    }
  };
};

const fbDataSingle = (collection, id, joinColumns) => {
  return async (dispatch, getState, { getFirestore }) => {
    const db = getFirestore();
    try {
      await dispatch(fbSingleDataBegin());

      const data = (
        await db
          .collection(collection)
          .doc(id.toString())
          .get()
      ).data();

      if (joinColumns !== undefined) {
        const promiss = [];
        joinColumns.forEach(joinColumn => {
          if (data[joinColumn.key].length === 0) {
            return;
          }
          promiss.push(
            db
              .collection(joinColumn.joinCollection)
              .where('id', 'in', [data[joinColumn.key]].flat())
              .get()
              .then(query => {
                const newVal = [];
                query.forEach(doc => {
                  newVal.push(doc.data());
                });
                data[joinColumn.key] = Array.isArray(data[joinColumn.key]) ? newVal : newVal[0];
              }),
          );
        });

        await Promise.all(promiss);
      }

      await dispatch(fbSingleDataSuccess(collection, data));
    } catch (err) {
      await dispatch(fbSingleDataErr(err));
    }
  };
};

const fbFileUploder = (imageAsFile, location) => {
  return async (dispatch, getState, { storage }) => {
    try {
      await dispatch(fbUploadBegin());

      const fileName = imageAsFile.name.replace(/(\.[\w\d_-]+)$/i, `_${new Date().getTime()}$1`);
      const uploadTask = storage()
        .ref(`/${location}/${fileName}`)
        .put(imageAsFile);

      await uploadTask.on(
        'state_changed',
        () => {},
        err => {
          dispatch(fbUploadErr(err));
        },
        () => {
          storage()
            .ref(location)
            .child(fileName)
            .getDownloadURL()
            .then(fireBaseUrl => {
              dispatch(fbUploadSuccess({ name: fileName, url: fireBaseUrl }));
            });
        },
      );
    } catch (err) {
      await dispatch(fbUploadErr(err));
    }
  };
};

const fbFileReader = (location, fileName) => {
  return async (dispatch, getState, { storage }) => {
    try {
      await dispatch(fbReadFileBegin());

      storage()
        .ref(location)
        .child(fileName)
        .getDownloadURL()
        .then(fireBaseUrl => {
          dispatch(fbReadFileSuccess(fireBaseUrl));
        });
    } catch (err) {
      await dispatch(fbReadFileErr(err));
    }
  };
};

const fbFileClear = () => {
  return async dispatch => {
    try {
      await dispatch(fbUploadBegin());
      dispatch(fbUploadSuccess(null));
    } catch (err) {
      await dispatch(fbUploadErr(err));
    }
  };
};

export {
  fbDataClean,
  fbDataSubmit,
  fbDataSearch,
  fbDataDelete,
  fbDataSingle,
  fbDataUpdate,
  fbDataRead,
  fbFileReader,
  fbFileUploder,
  fbFileClear,
};

