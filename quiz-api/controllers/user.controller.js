import mongoose from 'mongoose';

import User from '../modals/User.modal';

export const addDefaultUser = () => {

    const newUser = new User();
    newUser.user_name = 'admin'
    newUser.role = 'admin'
    newUser.setPassword('admin');
	newUser.save((err, user) => {
		if (err) {
			return false
        }
        return true
	});
}

export const login = (req, res) => {
	console.log(req.body)
	User.find({ user_name: req.body.user_name }).exec((err, user) => {
		if (err) {
			return res.json({ 'success': false, 'message': 'Some Error in List' });
        }
        if (user.length != 0) {
            if(user[0].validPassword(req.body.password)){
                var token = user[0].generateJwt();
                res.cookie("SESSIONID", user[0].generateJwt(), { httpOnly: false, secure: false });
                return res.json({ 'success': true, 'message': 'login successfully',token });
            }else{
                return res.json({ 'success': false, 'message': 'invalid username or password' });
            }
		}else{
			return res.json({ 'success': false, 'message': 'invalid username or password' });
		}
		return res.json(user);
	});
}