const actions = {
  READ_FILTERS_BEGIN: 'READ_FILTERS_BEGIN',
  READ_FILTERS_SUCCESS: 'READ_FILTERS_SUCCESS',
  READ_FILTERS_ERR: 'READ_FILTERS_ERR',

  readFiltersActions: {
    begin: () => {
      return {
        type: actions.READ_FILTERS_BEGIN,
      };
    },

    success: data => {
      return {
        type: actions.READ_FILTERS_SUCCESS,
        data,
      };
    },

    error: err => {
      return {
        type: actions.READ_FILTERS_ERR,
        err,
      };
    },
  },
};

export default actions;
