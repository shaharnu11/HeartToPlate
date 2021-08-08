import actions from './actions';

const { READ_FILTERS_BEGIN, READ_FILTERS_SUCCESS, READ_FILTERS_ERR } = actions;

const initialState = {
  filters: undefined,
  loading: false,
  error: null,
};

const filtersReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case READ_FILTERS_BEGIN:
      return {
        ...state,
        filters: undefined,
      };

    case READ_FILTERS_SUCCESS:
      return {
        ...state,
        filters: data,
        error: false,
      };

    case READ_FILTERS_ERR:
      return {
        ...state,
        error: err,
      };

    default:
      return state;
  }
};

export default filtersReducer;
