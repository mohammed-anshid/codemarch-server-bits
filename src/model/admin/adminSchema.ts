import { Schema , model } from 'mongoose';

const adminSchema : Schema = new Schema ({
    
    email :{
        type:String,
    },
    password :{
        type:String,
        trim:true
    }
    
},{timestamps:true});

export default model('admins',adminSchema);