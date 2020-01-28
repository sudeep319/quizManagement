import mongoose from 'mongoose';
import TestModel from '../models/test.model';

import Question from '../models/question.model';
//get questions list
export const getQuestionList = (req, res) => {
	console.log('getting questions list')
	Question.find().exec((err, questions) => {

		if (err) {
			return res.json({ 'success': false, 'message': 'Some Error in List' });
		}
		return res.json(questions);
	});
}
//Get question
export const getQuestion = (req, res) => {
	Question.find({ _id: req.params.id }).exec((err, question) => {
		if (err) {
			return res.json({ 'success': false, 'message': 'Some Error in List', err });
		}
		if (question.length != 0) {
			return res.json(question[0]);
		} else {
			return res.json({ 'success': false, 'message': 'Question not found' });
		}
	});
}
export const getTestQuestionList = (req, res) => {
	Question.find({ test_id: req.params.test_id }).exec((err, questions) => {
		if (err) {
			return res.json({ 'success': false, 'message': 'Some Error in List', err });
		}
		if (questions.length != 0) {
			return res.json(questions);
		} else {
			return res.json({ 'success': false, 'message': 'Questions not found' });
		}
	});
}
//Update question
export const editQuestion = (req, res) => {
	Question.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, question) => {
		if (err) {
			return res.json({ 'success': false, 'message': 'Some error in update', 'error': err });
		}
		return res.json({ 'success': true, 'message': 'question Updated Successfully' });
	});
}
//Delete question
export const deleteQuestion = (req, res) => {
	console.log(req.params.test_id)
	Question.findOneAndDelete({_id:req.params.id}, (err, question) => {
		if (err) {
			return res.json({ 'success': false, 'message': 'Getting Error' });
		}
		
		Question.find({ test_id: req.params.test_id }).exec((err, questions) => {
			if (err) {
				return res.json({ 'success': false, 'message': 'Some Error in List', err });
			}
				TestModel.findOneAndUpdate({ _id: req.params.test_id }, { total_ques: questions.length, total_marks: questions.length }, { new: true }, (err, question) => {
					if (err) {
						return res.json({ 'success': false, 'message': 'Some error in update', 'error': err });
					}
					return res.json({ 'success': true, 'message': 'question successfully deleted' });
				});
				return;
		});
	})
}
// Add question
export const addQuestion = (req, res) => {
	console.log(req.body)
	const newQuestion = new Question();

	newQuestion.question = req.body.question;
	newQuestion.option1 = req.body.option1;
	newQuestion.option2 = req.body.option2;
	newQuestion.option3 = req.body.option3;
	newQuestion.option4 = req.body.option4;
	newQuestion.ans = req.body.ans;
	newQuestion.test_id = req.body.test_id

	newQuestion.save((err, question) => {
		if (err) {
			return res.json({ 'success': false, 'message': err.message });
		}
		Question.find({ test_id: req.body.test_id }).exec((err, questions) => {
			if (err) {
				return res.json({ 'success': false, 'message': 'Some Error in List', err });
			}
			if (questions.length) {
				TestModel.findOneAndUpdate({ _id: req.body.test_id }, { total_ques: questions.length, total_marks: questions.length }, { new: true }, (err, question) => {
					if (err) {
						return res.json({ 'success': false, 'message': 'Some error in update', 'error': err });
					}
					return res.json({ 'success': true, 'message': 'question successfully addedd' });
				});
				return;
			}
			return;
		});
		return;
	})
}