import { Request , Response } from 'express'
import { genSalt , hash , compare } from 'bcrypt'
import jwt from 'jsonwebtoken';
import adminModel from '../../model/admin/adminSchema';


//-------------------------> Admin-Signin <-----------------------------//

export const adminSignin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        if(email && password){
            const user = await adminModel.findOne({ email:email })
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