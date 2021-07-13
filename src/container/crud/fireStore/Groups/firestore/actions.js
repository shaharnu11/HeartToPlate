const actions = {
  READ_GROUPS_BEGIN: 'READ_GROUPS_BEGIN',
  READ_GROUPS_SUCCESS: 'READ_GROUPS_SUCCESS',
  READ_GROUPS_ERR: 'READ_GROUPS_ERR',

  READ_GROUP_FILTERS_BEGIN: 'READ_GROUP_FILTERS_BEGIN',
  READ_GROUP_FILTERS_SUCCESS: 'READ_GROUP_FILTERS_SUCCESS',
  READ_GROUP_FILTERS_ERR: 'READ_GROUP_FILTERS_ERR',

  readGroupFiltersActions: {
    begin: () => {
      return {
        type: actions.READ_GROUP_FILTERS_BEGIN,
      };
    },

    success: data => {
      return {
        type: actions.READ_GROUP_FILTERS_SUCCESS,
        data,
      };
    },

    error: err => {
      return {
        type: actions.READ_GROUP_FILTERS_ERR,
        err,
      };
    },
  },
  readGroupActions: {
    begin: () => {
      return {
        type: actions.READ_GROUPS_BEGIN,
      };
    },

    success: data => {
      const action = {
        type: actions.READ_GROUPS_SUCCESS,
        data,
      };

      return action;
    },

    error: err => {
      return {
        type: actions.READ_GROUPS_ERR,
        err,
      };
    },
  },
};

export default actions;
