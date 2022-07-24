const { authJwt } = require('../middleware');

const controller = require('../controllers/admin.controller');
const examController = require('../controllers/examdata.controller');
const questionController = require('../controllers/question.controller');
const uploadController = require('../controllers/upload.controller');
const responseController = require('../controllers/response.controller');
module.exports = function (app) {
  app.use(function (request, response, next) {
    response.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // DATA USER CRUD
  app.get('/api/admin/users', [authJwt.verifyToken, authJwt.isAdmin], controller.getAllUser);
  app.get('/api/admin/users/id/:username', [authJwt.verifyToken, authJwt.isAdmin], controller.getUserByUsername);
  app.get('/api/admin/users/role/:role', [authJwt.verifyToken, authJwt.isAdmin], controller.getUserByRoles);
  app.post('/api/admin/users/create', [authJwt.verifyToken, authJwt.isAdmin], controller.createNewUser);

  // EXAM DATA ROUTES
  app.get('/api/admin/exam', [authJwt.verifyToken, authJwt.isAdmin], examController.getAllExam);
  app.post('/api/admin/exam/create', [authJwt.verifyToken, authJwt.isAdmin], examController.createExam);
  // Receive Query id
  app.get('/api/admin/exam/get', [authJwt.verifyToken, authJwt.isAdmin], examController.getExamById);
  app.put('/api/admin/exam/update', [authJwt.verifyToken, authJwt.isAdmin], examController.updateExamById);
  app.delete('/api/admin/exam', [authJwt.verifyToken, authJwt.isAdmin], examController.deleteExamById);
  // Receive Parameters
  // app.get('/api/admin/exam', [authJwt.verifyToken, authJwt.isAdmin], examController.getQuestionsInExam);
  app.get('/api/admin/exam/:id', [authJwt.verifyToken, authJwt.isAdmin], examController.getQuestionsInExam);
  
  
  // QUESTION DATA ROUTES
  app.get('/api/admin/exam/questions', [authJwt.verifyToken, authJwt.isAdmin], questionController.getQuestionsInExam);
  app.get('/api/exam', [authJwt.verifyToken], examController.getActiveExam);
  app.get('/api/exam/:id/listening-questions', [authJwt.verifyToken], questionController.getListeningQuestions);
  app.get('/api/exam/:id/reading-questions', [authJwt.verifyToken], questionController.getReadingQuestions);
  app.get('/api/exam/:id/structure-questions', [authJwt.verifyToken], questionController.getStructureQuestions);
  app.post('/api/admin/exam/:id/question/add', [authJwt.verifyToken, authJwt.isAdmin], questionController.addQuestion);

  // RESPONSE ROUTES
  app.post('/api/responses', [authJwt.verifyToken], responseController.saveResponses)
  app.post('/api/results', [authJwt.verifyToken], responseController.saveNestedResponses)

  // Azure Blob Storage
  app.get('/api/azureBlob', [authJwt.verifyToken, authJwt.isAdmin], uploadController.listBlobs)
  app.get('/api/azureBlob/:filename', [authJwt.verifyToken, authJwt.isAdmin], uploadController.getBlobInfo)
  app.delete('/api/azureBlob/delete/:filename', [authJwt.verifyToken, authJwt.isAdmin], uploadController.deleteBlob)
}