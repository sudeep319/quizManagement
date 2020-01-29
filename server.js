const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 4000;
import mongoose from 'mongoose';
import quizRoutes from './routes/quiz.routes';
import * as userControllet from './controllers/user.controller';
app.use(cors());
app.use(bodyParser.json());
//mongodb connection

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/quizManagement', {
  useNewUrlParser: true, useUnifiedTopology: true
});
mongoose.connection.on('connected',()=>{
  console.log('mongodb connected')
})
userControllet.addDefaultUser(function(isuser){
  console.log(isuser)
});
userControllet.addDefaultAdmin(function(isadmin){
  console.log(isadmin)
})
app.use('/api', quizRoutes);
app.get('/', (req, res) => {
  return res.end('Api testing... it is working...');
})
// catch 404
app.use((req, res, next) => {
  res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
}
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});