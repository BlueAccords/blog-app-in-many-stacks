module.exports.index = function(req, res) {
  res.send('Public');
};

module.exports.admin = function(req, res) {
  res.send('Hello admin');
};