import express , { Router } from 'express'
import { adminSignin } from '../../controller/admin/adminController';
const router :Router = express.Router();

// User signup & signin Management routes //
// router.post('/signup',adminSignup)                   // user signup
router.post('/signin',adminSignin)                   // user signin

export default router ;