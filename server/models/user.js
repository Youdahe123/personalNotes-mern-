import mongoose  from "mongoose"

export const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    Date:{
        type:Date,
        default:Date.now()
    }

})
const User = mongoose.model('user',userSchema)
export default User

