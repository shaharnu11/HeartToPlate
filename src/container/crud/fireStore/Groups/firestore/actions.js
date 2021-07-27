const actions = {
  READ_GROUPS_BEGIN: 'READ_GROUPS_BEGIN',
  READ_GROUPS_SUCCESS: 'READ_GROUPS_SUCCESS',
  READ_GROUPS_ERR: 'READ_GROUPS_ERR',

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
