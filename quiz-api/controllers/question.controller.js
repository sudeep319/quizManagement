import mongoose from 'mongoose';

import Question from '../modals/question.modal';
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
export const getQuestion = (req, res) =>{
	Question.find({ _id: req.params.id }).exec((err, question) => {
		if (err) {
			return res.json({ 'success': false, 'message': 'Some Error in List',err });
		}
		if (question.length != 0) {
			return res.json(question[0]);
		}else{
			return res.json({ 'success': false, 'message': 'Question not found' });
		}
	});
}
//Update question
export const editQuestion = (req, res) =>{
	Question.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, question) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some error in update', 'error': err });
        }
        return res.json({ 'success': true, 'message': 'question Updated Successfully'});
	});
}
//Delete question
export const deleteQuestion = (req, res) =>{
	Question.findByIdAndRemove(req.params.id, (err, question) => {
		if (err) {
			return res.json({ 'success': false, 'message': 'Getting Error' });
		}
		else {
			return res.json({ 'success': true, 'message': 'question Deleted' });
		}
	})
}
// Add question
export const addQuestion = (req, res) => {
	// console.log(req.body)
	const newQuestion = new Question();
	newQuestion.question = req.body.question;
	newQuestion.options = req.body.options;
	newQuestion.ans = req.body.ans;
	newQuestion.test_id = req.body.test_id

	newQuestion.save((err, question) => {
		if (err) {
			return res.json({ 'success': false, 'message': err.message });
        }
        return res.json({ 'success': true, 'message': 'question successfully addedd' });
	});
}