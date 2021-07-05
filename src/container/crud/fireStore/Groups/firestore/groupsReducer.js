import actions from './actions';

const {
  READ_GROUP_FILTERS_BEGIN,
  READ_GROUP_FILTERS_SUCCESS,
  READ_GROUP_FILTERS_ERR,
  READ_GROUPS_BEGIN,
  READ_GROUPS_SUCCESS,
  READ_GROUPS_ERR,
} = actions;

const initialState = {
  groups: undefined,
  groupFilters: undefined,
  loading: false,
  error: null,
};

const groupsReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case READ_GROUP_FILTERS_BEGIN:
      return {
        ...state,
        groupFilters: undefined,
      };

    case READ_GROUP_FILTERS_SUCCESS:
      return {
        ...state,
        groupFilters: data,
        error: false,
      };

    case READ_GROUP_FILTERS_ERR:
      return {
        ...state,
        error: err,
      };

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
