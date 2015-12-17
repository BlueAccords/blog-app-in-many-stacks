/*
 * Responds with a general error
 *
 * @param {object} res The response object
 * @param {string} message The error message
 * @returns {void}
 */
module.exports.generalErrorResponse = (res, message ='Something went wrong') => {
  res.status(400).json({
    errors: {
      general: message,
    },
  });
};

/*
 * Responds with a permissions error
 *
 * @param {object} res The response object
 * @param {string} message The error message
 * @returns {void}
 */
module.exports.permissionsErrorResponse = (res, message ='You do not have permissions to perform this action') => {
  res.status(403).json({
    errors: {
      permissions: message,
    },
  });
};
