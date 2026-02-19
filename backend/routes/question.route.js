import express from 'express';

import { deleteQuestion, getAllQuestions, getQuestionforStudent, postQuestion } from '../controllers/questions.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import isAdminAuthenticated from '../middlewares/isAdminAuthenticated.js';
const router = express.Router();

router.route('/post').post(isAdminAuthenticated,postQuestion);
router.route('/getAllQuestions').get(isAdminAuthenticated,getAllQuestions);
router.route('/:id/delete').get(isAdminAuthenticated,deleteQuestion);

// question route for students
router.route('/getQuestionforStudents').get(isAuthenticated,getQuestionforStudent);

export default router;