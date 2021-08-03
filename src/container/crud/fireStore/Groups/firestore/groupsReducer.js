import actions from './actions';

const {
  READ_GROUPS_BEGIN,
  READ_GROUPS_SUCCESS,
  READ_GROUPS_ERR,
} = actions;

const initialState = {
  groups: undefined,
  loading: false,
  error: null,
};

const groupsReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case READ_GROUPS_BEGIN:
      return {
        ...state,
        groups: undefined,
      };
      case READ_GROUPS_SUCCESS:
        return {
          ...state,
          groups: data,
          error: false,
        };

    case READ_GROUPS_ERR:
      return {
        ...state,
        error: err,
      };

    default:
      return state;
  }
};

export default groupsReducer;
