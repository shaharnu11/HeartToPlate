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
  notification.error({
    message: err,
  });
};

const {
  fbAddBegin,
  fbAddSuccess,
  fbAddErr,

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
const fbDataRead = (collection, pagination, sorter) => {
  return async (dispatch, getState, { getFirestore }) => {
    const db = getFirestore();
    const data = [];
    try {
      await dispatch(fbReadBegin());

      let collectionRef = db.collection(collection);
      if (sorter != null) {
        collectionRef = collectionRef.orderBy(sorter.columnKey, sorter.order);
      }
      if (pagination != null) {
        collectionRef = collectionRef.limit(pagination.pageSize * pagination.current + 1);
      }
      const query = await collectionRef.get();

      await query.forEach(doc => {
        data.push(doc.data());
      });

      const isEndOfCollection = data.length > pagination.pageSize * pagination.current;

      if (isEndOfCollection) {
        data.pop();
        [...Array(pagination.pageSize).keys()].forEach(_ => {
          data.push(data[data.length - 1]);
        });
      }

      await dispatch(fbReadSuccess(data));
    } catch (err) {
      await dispatch(fbReadErr(err));
    }
  };
};

const fbDataSearch = (collection, value, keys) => {
  return async (dispatch, getState, { getFirestore }) => {
    const db = getFirestore();
    const data = [];
    try {
      await dispatch(fbSearchBegin());
      const query = await db
        .collection(collection)
        .where(keys[0], '>=', value)
        .get();
      await query.forEach(doc => {
        data.push(doc.data());
      });
      const searchValue = data.filter(item => item.name.toLowerCase().startsWith(value.toLowerCase()));
      // await dispatch(fbSearchSuccess(searchValue));
      await dispatch(fbSearchSuccess({ collection, data: [12345, 2, 3] }));
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
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
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

const fbDataSingle = (collection, id) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    try {
      await dispatch(fbSingleDataBegin());
      const query = await db
        .collection(collection)
        .where('id', '==', id)
        .get();
      await query.forEach(doc => {
        dispatch(fbSingleDataSuccess(doc.data()));
      });
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
  return async (dispatch, getState, { getFirebase, getFirestore, storage }) => {
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
