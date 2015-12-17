/*
 * Responds with a general error
 *
 * @param {string} message The error message
 * @param {object} res The response object
 * @returns {void}
 */
module.exports.generalErrorResponse = (res, message) => {
  res.status(400).json({
    errors: {
      general: message,
    },
  });
};
