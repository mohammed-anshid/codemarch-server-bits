import { Schema , model } from 'mongoose';

const userSchema : Schema = new Schema ({
    
    username :{
        type:String,
    },
    password :{
        type:String,
        trim:true
    }
    
},{timestamps:true});

export default model('users',userSchema);