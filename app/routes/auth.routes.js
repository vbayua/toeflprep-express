const { verifySignUp } = require('../middleware/index');
const controller = require('../controllers/auth.controller');

module.exports = function (app) {
  app.use(function (request, response, next) {
    response.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post('/api/auth/signup', [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
  ],
    controller.signup);

  app.post('/api/auth/signin', controller.signin);
}