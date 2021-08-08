import actions from './actions';

const { READ_ORGANIZATIONS_BEGIN, READ_ORGANIZATIONS_SUCCESS, READ_ORGANIZATIONS_ERR } = actions;

const initialState = {
  organizations: undefined,
  loading: false,
  error: null,
};

const organizationsReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case READ_ORGANIZATIONS_BEGIN:
      return {
        ...state,
        organizations: undefined,
      };

    case READ_ORGANIZATIONS_SUCCESS:
      return {
        ...state,
        organizations: data,
        error: false,
      };

    case READ_ORGANIZATIONS_ERR:
      return {
        ...state,
        error: err,
      };

    default:
      return state;
  }
};

export default organizationsReducer;
