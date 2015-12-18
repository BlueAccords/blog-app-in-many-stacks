/*
 * Responds with a general error
 *
 * @param {object} res The response object
 * @param {string[]} messages Array of error message strings
 * @returns {void}
 */
module.exports.generalErrorResponse = (res, messages =['Something went wrong']) => {
  return res.status(400).json({
    errors: {
      general: messages,
    },
  });
};

/*
 * Responds with an unauthorized error
 *
 * @param {object} res The response object
 * @param {string[]} messages Array of error message strings
 * @returns {void}
 */
module.exports.unauthorizedErrorResponse = (res, messages =['Failed to authenticate token']) => {
  return res.status(401).json({
    errors: {
      permissions: messages,
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
  return res.status(403).json({
    errors: {
      permissions: messages,
    },
  });
};
