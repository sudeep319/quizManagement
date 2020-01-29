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
	Question.findOneAndDelete({ _id: req.params.id }, (err, question) => {
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

export const getTestScore = async(req, res) => {
	var answers = req.body.answers;
	var data = {
		attemp: answers.length,
		right: 0,
		wrong: 0,
		score: 0
	}
	for(var i=0; i<answers.length; i++){
		var q = await getScore(answers[i].ques_id) 
		for(var j=0; j<answers.length; j++){
			if(q[0]._id == answers[j].ques_id){
				if (q[0].ans == answers[j].ans) {
					data.right++
					data.score++
				} else {
					data.wrong++
				}
			}
		}
		
	}
	return res.json({ 'success': true, score:data });
}
const getScore = (ques_id) => {
	return new Promise(function (resolve, reject) {
		Question.find({ _id: ques_id }).exec((err, q) => {
			resolve(q)
		});
	})
}