const express = require('express');
const cartRouter = require('./CartRouter');

const {protectRoute, modifyPassword, validateAutherization, resetPassword, loginUser, signupUser, modifyUser, deactivteUser, getUsers, getUser, logout, forgetPassword} = require('../Controllers/AuthenticationController');

const userRouter = express.Router();


userRouter.use('/cart', cartRouter);
userRouter.use('/confirmLogin', protectRoute, (req, res, next)=>{res.json({status: 'success'})});
userRouter.route('/login').post(loginUser);
userRouter.route('/signup').post(signupUser);         
userRouter.route('/modify').patch(protectRoute, modifyUser);      
userRouter.route('/password').patch(protectRoute, modifyPassword);
userRouter.route('/deleteUser').delete(protectRoute, deactivteUser);             
userRouter.route('/logout').get(protectRoute, logout);
userRouter.route('/forgetPassword').post(forgetPassword);
userRouter.route('/resetPassword/:resetToken').patch(resetPassword);
userRouter.route('/').get(protectRoute, validateAutherization('Administrator'), getUsers);
userRouter.route('/:email').get(protectRoute, getUser);                      

module.exports = userRouter;    