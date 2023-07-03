import { Request , Response } from 'express'
import { genSalt , hash , compare } from 'bcrypt'
import jwt from 'jsonwebtoken';
import userModel from '../../model/user/userSchema'; 



//-------------------------> User-Signup <-----------------------------//

export const userSignup = async (req: Request, res: Response) => {
    try {
        const { username,email, password } = req.body
        console.log(req.body)
        if( username && email && password ){
            const userEmailExists = await userModel.findOne({ email: email})
            if(!userEmailExists) {
                const salt = await genSalt(10)
                const hashedPassword = await hash(password, salt)
                const newUser = new userModel({
                    username: username,
                    email: email,
                    password: hashedPassword
                })
                await newUser.save()
                const user = await userModel.findOne({email:email})
                let userId = user?._id
                const token = jwt.sign({userId},process.env.JWT_KEY as string ,{ expiresIn: '2d' })
                res.status(200).json({
                    status:true,
                    message: 'User created successfully',
                    token: token
                })
            }else{
                res.json({status:false,message:'email already exists'})
            }
        }else{
            res.status(400).json({status: false,message: 'Please fill all the fields'})
        }
    } catch (error) {
        res.status(500).json({status:false,message:'internal server error'})
    }
}


//-------------------------> User-Signin <-----------------------------//

export const userSignin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        if(email && password){
            const user = await userModel.findOne({ email:email })
                if(user){
                    const userPass = user.password as string
                    const isMatched = await compare(password, userPass)
                    if( isMatched){
                        const userEmail = user.email as string
                        if(userEmail === email && isMatched){
                            const token = jwt.sign({ userId: user._id}, process.env.JWT_KEY as string, { expiresIn: '2d' })
                            res.status(200).json({
                                status:true,
                                message: 'Signin successfully',
                                token: token
                            })
                        }else{
                            res.status(400).json({auth:false,message:'Your email or password is incorrect'})
                        }
                    }else{
                        res.status(400).json({auth:false,message:'Your email or password is incorrect'})
                    }
                }else{
                    res.status(400).json({auth:false,message:'User not exist'})
                }
        }else{
            res.status(400).json({auth:false,message:'All feilds are required'})
        }
    } catch (error) {
        res.status(500).json({status:false,message:'internal server error'})
    }
}