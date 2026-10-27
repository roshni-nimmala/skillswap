const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const userSchema =new mongoose.Schema({
    name:{
        type:String,
       required:[true, "Name is Required"],
        trim:true,
        minlength:[2,"Name should atleast contain 2 characters"],
        maxlength:[100,"Name should not exceed 100 characters"],
    },
    email:{
        type:String,
        required:[true, "Email is Required"],
        trim:true,
        lowercase:true,
        match:[/^\S+@\S+\.\S+$/,"Please enter a valid email address"],
        unique:true
    },
    password:{
        type: String,
        required: [true,"Password is Required"],
        minlength:[4,"Password must contain atleast 4 characters"]
    },
     skills: {
        type: [String],
        default: [],
        trim:true
    },

    learnSkills: {
        type: [String],
        default: [],
          trim:true
    },

    bio: {
        type: String,
        default: "",
        trim:true
    },

    qualification: {
        type: String,
        default: "",
        trim:true
    }
});
userSchema.pre('save',async function(){
    if(!this.isModified('password')){
        return;
    }
    this.password=await bcrypt.hash(this.password,10);
    

});
const User=mongoose.model("User",userSchema);
module.exports=User;
