const actions = {
  READ_ORGANIZATIONS_BEGIN: 'READ_ORGANIZATIONS_BEGIN',
  READ_ORGANIZATIONS_SUCCESS: 'READ_ORGANIZATIONS_SUCCESS',
  READ_ORGANIZATIONS_ERR: 'READ_ORGANIZATIONS_ERR',

  readOrganizationActions: {
    begin: () => {
      return {
        type: actions.READ_ORGANIZATIONS_BEGIN,
      };
    },

    success: data => {
      const action = {
        type: actions.READ_ORGANIZATIONS_SUCCESS,
        data,
      };
      console.log("this is action.data in organizationsReducer - should be organizations: " + JSON.stringify(action.data))
      console.log("this is action in organizationsReducer - should be organizations: " + JSON.stringify(action))
      return action;
    },

    error: err => {
      return {
        type: actions.READ_ORGANIZATIONS_ERR,
        err,
      };
    },
  },
};

export default actions;
