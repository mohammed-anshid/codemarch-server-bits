import express , { Router } from 'express';
import { userSignin, userSignup } from '../../controller/user/userController';
const router :Router = express.Router();

// User signup & signin Management routes //
router.post('/signup',userSignup)                   // user signup
router.post('/signin',userSignin)                   // user signin

export default router ;