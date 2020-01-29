import mongoose from 'mongoose';
import Question from '../models/question.model';
import TestModel from '../models/test.model';

//get tests list
export const getTestList = (req, res) => {
	TestModel.find().exec((err, tests) => {
		if (err) {
			return res.json({ 'success': false, 'message': 'Some Error in List' });
		}
		return res.json(tests);
	});
}
//Get test
export const getTest = (req, res) =>{
	var data = {}
	TestModel.find({ _id: req.params.id }).exec((err, test) => {
		if (err) {
			return res.json({ 'success': false, 'message': 'Some Error in List',err });
		}
		data.test = test[0];
		if (test.length != 0) {
			Question.find({ test_id: req.params.id },{ans:0}).exec((err, questions) => {
				if (err) {
					return res.json({ 'success': false, 'message': 'Some Error in List', err });
				}
				test[0].questions = questions;
				data.questions = questions
				return res.json(data);
			});
			return;
		}else{
			return res.json({ 'success': false, 'message': 'Test not found' });
		}
	});
}
//Update test
export const editTest = (req, res) =>{
	TestModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, test) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some error in update', 'error': err });
        }
        return res.json({ 'success': true, 'message': 'test Updated Successfully'});
	});
}
//Delete test
export const deleteTest = (req, res) =>{
	TestModel.findByIdAndRemove(req.params.id, (err, test) => {
		if (err) {
			return res.json({ 'success': false, 'message': 'Getting Error' });
		}
		else {
			return res.json({ 'success': true, 'message': 'test Deleted' });
		}
	})
}
// Add test
export const addTest = (req, res) => {
	// console.log(req.body)
	const newTest = new TestModel();
	newTest.test_name = req.body.test_name;
	newTest.total_ques = req.body.total_ques;
	newTest.total_marks = req.body.total_marks;
	newTest.duration = req.body.duration

	newTest.save((err, test) => {
		if (err) {
			return res.json({ 'success': false, 'message': err.message });
        }
        return res.json({ 'success': true, 'message': 'test successfully addedd' });
	});
}