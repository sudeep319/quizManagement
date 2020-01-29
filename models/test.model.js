import mongoose from 'mongoose';

var Schema = mongoose.Schema({
    test_name: String,
    total_ques: Number,
    total_marks: Number,    
    duration: Number
});

export default mongoose.model('TestModel', Schema);