const { authJwt } = require('../middleware');
const controller = require('../controllers/admin.controller');

module.exports = function (app) {
  app.use(function (request, response, next) {
    response.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  // app.get('/api/admin/all', controller.allAccess);
  // app.get('/api/test/user', [authJwt.verifyToken], controller.userBoard);
  // app.get('/api/test/user/:username', [authJwt.verifyToken, authJwt.isMe], controller.userProfile);
  // app.get('/api/test/mod', [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard);
  // app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
}