import express from 'express';
import * as questionControllet from '../controllers/question.controller';
import * as userController from '../controllers/user.controller';
import * as testController from '../controllers/test.controller';

const router = express.Router();

router.route('/Question')
      .get(questionControllet.getQuestionList)
      .post(questionControllet.addQuestion);
router.route('/Question/:id')
      .get(questionControllet.getQuestion)
      .delete(questionControllet.deleteQuestion)
      .put(questionControllet.editQuestion);
router.route('/Question/:id/:test_id')
      .delete(questionControllet.deleteQuestion);
router.route('/TestQuestion/:test_id')
      .get(questionControllet.getTestQuestionList);
      
router.route('/Login')
      .post(userController.login);

router.route('/Test')
      .get(testController.getTestList)
      .post(testController.addTest);
router.route('/Test/:id')
      .get(testController.getTest)
      .delete(testController.deleteTest)
      .put(testController.editTest);


export default router;