import { notification } from 'antd';
import actions from './actions';

const { todoReadBegin, todoReadSuccess, todoReadErr, starUpdateBegin, starUpdateSuccess, starUpdateErr } = actions;

const ToDoGetData = () => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      dispatch(todoReadBegin());
      const db = getFirestore();
      const datas = [];

      await db
        .collection('ToDo')
        .get()
        .then(query =>
          query.forEach(doc => {
            datas.push(doc.data());
          }),
        );
      dispatch(todoReadSuccess(datas));
    } catch (err) {
      dispatch(todoReadErr(err));
    }
  };
};

const ToDoAddData = (toDos, newToDos) => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      dispatch(todoReadBegin());
      const db = getFirestore();
      await db
        .collection('ToDo')
        .doc(`${newToDos.id}`)
        .set(newToDos);
      await dispatch(todoReadSuccess([...toDos, newToDos]));
      notification.success({
        message: 'Your ToDo was successfully added',
      });
    } catch (err) {
      dispatch(todoReadErr(err));
    }
  };
};

const ToDoDeleteData = (todos, deletedTodo) => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      dispatch(todoReadBegin());
      const db = getFirestore();
      await db
        .collection('ToDo')
        .doc(`${deletedTodo.id}`)
        .delete();
      dispatch(todoReadSuccess(todos.filter(_ => _.id !== deletedTodo.id)));
      notification.success({
        message: 'Your todo was successfully deleted',
      });
    } catch (err) {
      dispatch(todoReadErr(err));
    }
  };
};

const onStarUpdate = (todos, updatedTodo) => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      dispatch(starUpdateBegin());

      const db = getFirestore();
      await db
        .collection('ToDo')
        .doc(`${updatedTodo.id}`)
        .update({
          ...updatedTodo,
          favorite: !updatedTodo.favorite,
        });
      dispatch(
        starUpdateSuccess(
          todos.map(_ => (_.id === updatedTodo.id ? { ...updatedTodo, favorite: !updatedTodo.favorite } : _)),
        ),
      );
    } catch (err) {
      dispatch(starUpdateErr(err));
    }
  };
};

const onActiveUpdate = (todos, updatedTodo) => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      dispatch(starUpdateBegin());

      const db = getFirestore();
      await db
        .collection('ToDo')
        .doc(`${updatedTodo.id}`)
        .update({
          ...updatedTodo,
          active: !updatedTodo.active,
        });
      dispatch(
        starUpdateSuccess(
          todos.map(_ => (_.id === updatedTodo.id ? { ...updatedTodo, active: !updatedTodo.active } : _)),
        ),
      );
    } catch (err) {
      dispatch(starUpdateErr(err));
    }
  };
};

export { ToDoGetData, ToDoAddData, ToDoDeleteData, onStarUpdate, onActiveUpdate };
