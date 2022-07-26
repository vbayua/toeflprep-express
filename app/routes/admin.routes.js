const { authJwt } = require('../middleware');

const controller = require('../controllers/admin.controller');
const examController = require('../controllers/examdata.controller');
const questionController = require('../controllers/question.controller');
const uploadController = require('../controllers/upload.controller');
const responseController = require('../controllers/response.controller');
const resultController = require('../controllers/result.controller');
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
  app.get('/api/admin/usersmhs', [authJwt.verifyToken, authJwt.isAdmin], controller.getUserMhs);
  app.get('/api/admin/users/id/:username', [authJwt.verifyToken, authJwt.isAdmin], controller.getUserByUsername);
  app.get('/api/admin/users/role/:role', [authJwt.verifyToken, authJwt.isAdmin], controller.getUserByRoles);
  app.post('/api/admin/users/create', [authJwt.verifyToken, authJwt.isAdmin], controller.createNewUser);

  // EXAM DATA ROUTES
  app.get('/api/admin/exam', [authJwt.verifyToken, authJwt.isAdmin], examController.getAllExam);
  app.post('/api/admin/exam/create', [authJwt.verifyToken, authJwt.isAdmin], examController.createExam);
  // Receive Query id
  app.get('/api/admin/exam/get', [authJwt.verifyToken, authJwt.isAdmin], examController.getExamById);
  app.put('/api/admin/exam/update', [authJwt.verifyToken, authJwt.isAdmin], examController.updateExamById);
  app.post('/api/admin/exam/status/:id', [authJwt.verifyToken, authJwt.isAdmin], examController.updateExamStatusById);
  app.delete('/api/admin/exam', [authJwt.verifyToken, authJwt.isAdmin], examController.deleteExamById);
  // Receive Parameters
  // app.get('/api/admin/exam', [authJwt.verifyToken, authJwt.isAdmin], examController.getQuestionsInExam);
  app.get('/api/admin/exam/:id', [authJwt.verifyToken, authJwt.isAdmin], examController.getQuestionsInExam);


  // QUESTION DATA ROUTES
  app.get('/api/admin/exam/questions', [authJwt.verifyToken, authJwt.isAdmin], questionController.getQuestionsInExam);
  app.get('/api/admin/exam/question/:id', [authJwt.verifyToken, authJwt.isAdmin], questionController.getQuestion);
  app.delete('/api/admin/question/:id', [authJwt.verifyToken, authJwt.isAdmin], questionController.deleteQuestion);
  app.get('/api/exam', [authJwt.verifyToken], examController.getActiveExam);
  app.get('/api/exam/:id/listening-questions', [authJwt.verifyToken], questionController.getListeningQuestions);
  app.get('/api/exam/:id/reading-questions', [authJwt.verifyToken], questionController.getReadingQuestions);
  app.get('/api/exam/:id/structure-questions', [authJwt.verifyToken], questionController.getStructureQuestions);
  app.post('/api/admin/exam/:id/question/add', [authJwt.verifyToken, authJwt.isAdmin], questionController.addQuestion);
  app.post('/api/admin/exam/question/:id/update', [authJwt.verifyToken, authJwt.isAdmin], questionController.updateQuestion);

  // ADMIN RESULT ROUTES
  app.get('/api/admin/exam/results/:examId', [authJwt.verifyToken, authJwt.isAdmin], resultController.getExamResults);
  app.get('/api/admin/exam/results/:userId', [authJwt.verifyToken, authJwt.isAdmin], resultController.getResultsByUserId);
  app.get('/api/admin/exam/results/:userId/:examId', [authJwt.verifyToken, authJwt.isAdmin], resultController.getUserResultId);

  // USER RESULT ROUTES
  app.get('/api/results/:userId', [authJwt.verifyToken], resultController.getResultsByUserId);
  app.get('/api/results/:userId/:examId', [authJwt.verifyToken], resultController.getUserResultId);

  // RESPONSE ROUTES
  app.post('/api/responses', [authJwt.verifyToken], responseController.saveResponses)
  app.post('/api/save/results', [authJwt.verifyToken], responseController.saveNestedResponses)

  // Azure Blob Storage
  app.get('/api/azureBlob', [authJwt.verifyToken, authJwt.isAdmin], uploadController.listBlobs)
  app.get('/api/azureBlob/:filename', [authJwt.verifyToken, authJwt.isAdmin], uploadController.getBlobInfo)
  app.delete('/api/azureBlob/delete/:filename', [authJwt.verifyToken, authJwt.isAdmin], uploadController.deleteBlob)
}