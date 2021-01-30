import { notification } from 'antd';
import actions from './actions';

const { noteReadBegin, noteReadSuccess, noteReadErr, labelUpdateBegin, labelUpdateSuccess, labelUpdateErr } = actions;

const noteGetData = () => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      dispatch(noteReadBegin());
      const db = getFirestore();
      const datas = [];

      await db
        .collection('Notes')
        .get()
        .then(query =>
          query.forEach(doc => {
            datas.push(doc.data());
          }),
        );
      dispatch(noteReadSuccess(datas));
    } catch (err) {
      dispatch(noteReadErr(err));
    }
  };
};

const noteAddData = (notes, newNote) => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      dispatch(noteReadBegin());
      const db = getFirestore();
      await db
        .collection('Notes')
        .doc(`${newNote.id}`)
        .set(newNote);
      await dispatch(noteReadSuccess([...notes, newNote]));
      notification.success({
        message: 'Your note was successfully added',
      });
    } catch (err) {
      dispatch(noteReadErr(err));
    }
  };
};

const noteDeleteData = (notes, deletedNote) => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      dispatch(noteReadBegin());
      const db = getFirestore();
      await db
        .collection('Notes')
        .doc(`${deletedNote.id}`)
        .delete();
      dispatch(noteReadSuccess(notes.filter(_ => _.id !== deletedNote.id)));
      notification.success({
        message: 'Your note was successfully deleted',
      });
    } catch (err) {
      dispatch(noteReadErr(err));
    }
  };
};

const onLabelUpdate = (noteData, data, label) => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      dispatch(labelUpdateBegin());
      const db = getFirestore();
      await db
        .collection('Notes')
        .doc(`${data.id}`)
        .set({ ...data, label });

      noteData.map(_ => {
        if (_.id === data.id) {
          const fav = _;
          fav.label = label;
        }
        return dispatch(labelUpdateSuccess(noteData));
      });
    } catch (err) {
      dispatch(labelUpdateErr(err));
    }
  };
};

// const onLabelFilter = label => {
//   return async dispatch => {
//     try {
//       dispatch(labelUpdateBegin());
//       const data = initialState.filter(item => {
//         return label === 'all' ? initialState : label === 'favorite' ? item.stared : item.label === label;
//       });

//       dispatch(labelUpdateSuccess(data));
//     } catch (err) {
//       dispatch(labelUpdateErr(err));
//     }
//   };
// };

export {
  noteGetData,
  noteAddData,
  noteDeleteData,
  onLabelUpdate,
  // onLabelFilter
};
