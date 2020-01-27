import mongoose from 'mongoose';

var Schema = mongoose.Schema({
    test_id: String,
    question: String,
    option1: String, 
    option2: String,
    option3: String,
    option4: String,   
    ans: Number
});

export default mongoose.model('Question', Schema);