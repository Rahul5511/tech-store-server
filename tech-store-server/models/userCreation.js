const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const createUserSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

createUserSchema.pre('save',async function(next){
    if(this.isModified('password')){
         const salt =await bcrypt.genSalt(10)
         this.password = await bcrypt.hash(this.password,salt)
    }
    next();
})

createUserSchema.methods.comparePassword = async function (userPassword) {
    return await bcrypt.compare(userPassword,this.password)
}

const createUserModel = new mongoose.model('createUser',createUserSchema);

module.exports = createUserModel