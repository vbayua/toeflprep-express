exports.allAccess = (request, response) => {
  response.status(200).send('Public Content');
};

exports.userBoard = (request, response) => {
  response.status(200).send('user content');
};

exports.adminBoard = (request, response) => {
  response.status(200).send('admin content');
};

exports.moderatorBoard = (request, response) => {
  response.status(200).send('Moderator board');
};