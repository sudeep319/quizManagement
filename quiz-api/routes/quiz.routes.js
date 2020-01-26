import express from 'express';
import * as questionControllet from '../controllers/question.controller';
import * as userController from '../controllers/user.controller';

const router = express.Router();

router.route('/Question')
      .get(questionControllet.getQuestionList)
      .post(questionControllet.addQuestion);
router.route('/Question/:id')
      .get(questionControllet.getQuestion)
      .delete(questionControllet.deleteQuestion)
      .put(questionControllet.editQuestion);
router.route('/Login')
      .post(userController.login)


export default router;