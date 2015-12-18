/*
 * Responds with a general error
 *
 * @param {object} res The response object
 * @param {string[]} messages Array of error message strings
 * @returns {void}
 */
module.exports.generalErrorResponse = (res, messages =['Something went wrong']) => {
  res.status(400).json({
    errors: {
      general: messages,
    },
  });
};

/*
 * Responds with a permissions error
 *
 * @param {object} res The response object
 * @param {string[]} messages Array of error message strings
 * @returns {void}
 */
module.exports.permissionsErrorResponse = (res, messages =['You do not have permissions to perform this action']) => {
  res.status(403).json({
    errors: {
      permissions: messages,
    },
  });
};
