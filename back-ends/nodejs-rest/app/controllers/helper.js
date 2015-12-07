module.exports = {
  success: (res) => {
    return res.json({
      message: 'Successful request.',
    });
  },
  userExists: (res) => {
    return res.json({
      message: 'Error: That user already exits.',
    });
  },
  noUserFound: (res) => {
    return res.json({
      message: 'User(s) not found',
    });
  },
  permissionDenied: (res) => {
    return res.json({
      message: 'Permission denied. Request failed.',
    });
  },
  tokenFail: (res) => {
    return res.json({
      message: 'Failed to authenticate this token.',
    });
  },
};
