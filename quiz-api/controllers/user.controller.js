import mongoose from 'mongoose';

import User from '../models/user.model';
export const addDefaultAdmin = (fn) => {
    User.find({ user_name: 'admin' }).exec((err, user) => {
		if (err) {
			return res.json({ 'success': false, 'message': 'Some Error in List' });
        }
        if (user.length == 0) {
            const newUser = new User();
            newUser.user_name = 'admin'
            newUser.role = 'admin'
            newUser.setPassword('admin');
            newUser.save((err, user) => {
                if (err) {
                    fn(false)
                    return;
                }
                fn(true)
                return;
            });
        }
    })
    
}
export const addDefaultUser = (fn) => {
    User.find({ user_name: 'user' }).exec((err, user) => {
		if (err) {
			return res.json({ 'success': false, 'message': 'Some Error in List' });
        }
        if (user.length == 0) {
            const newUser = new User();
            newUser.user_name = 'user'
            newUser.role = 'user'
            newUser.setPassword('user');
            newUser.save((err, user) => {
                if (err) {
                    fn(false)
                    return;
                }
                fn(true)
                return;
            });
        }
    })
    
}

export const login = (req, res) => {
	User.find({ user_name: req.body.user_name }).exec((err, user) => {
		if (err) {
			return res.json({ 'success': false, 'message': 'Some Error in List' });
        }
        if (user.length != 0) {
            if(user[0].validPassword(req.body.password)){
                var token = user[0].generateJwt();
                res.cookie("SESSIONID", user[0].generateJwt(), { httpOnly: false, secure: false });
                return res.json({ 'success': true, 'message': 'login successfully',token,role:user[0].role });
            }else{
                return res.json({ 'success': false, 'message': 'invalid username or password' });
            }
		}else{
			return res.json({ 'success': false, 'message': 'invalid username or password' });
		}
		return res.json(user);
	});
}