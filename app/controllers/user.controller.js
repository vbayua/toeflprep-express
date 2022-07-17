exports.allAccess = (request, response) => {
  response.status(200).send('Public Content');
};

exports.userBoard = (request, response) => {
  // Content for all users to see
  const query = request.query.role
  if (!query) {
    response.status(200).send('Hello There');
  } else {
    response.status(200).send({
      message: `You search for ${request.query.role} ?`
    });
  }
};

exports.userProfile = (request, response) => {
  // content for only individual to see
  response.status(200).send({
    message: `Hello there User: ${request.params.username}`,
    token: `headers ${request.username}`
  });
};

exports.adminBoard = (request, response) => {
  // Content for all Admin to see
  const query = request.query.role
  if (!query) {
    response.status(200).send('Hello There admin');
  } else {
    response.status(200).send({
      message: `You search for ${request.query.role} ?`
    });
  }
};

exports.moderatorBoard = (request, response) => {
  response.status(200).send('Moderator board');
};