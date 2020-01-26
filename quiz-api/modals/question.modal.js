import mongoose from 'mongoose';

var Schema = mongoose.Schema({
    test_id: String,
    question: String,
    options: Array,    
    ans: Array
});

export default mongoose.model('Question', Schema);