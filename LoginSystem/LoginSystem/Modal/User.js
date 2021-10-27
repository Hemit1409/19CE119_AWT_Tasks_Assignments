const mongoose = require('mongoose')
const bcrpyt = require('bcrypt')
mongoose.connect("mongodb://localhost:27017/LoginDemo",{
 useNewUrlParser:true,
 useUnifiedTopology:true,
 useCreateIndex:true
})
const userSchema=mongoose.Schema({
 username:{
 type:String,
 unique:true,
 required:true
 },
 email:{
 type:String,
 unique:true,
 required:true
 },
 password:{
 type:String,
 required:true
 }
})
// useful function
userSchema.pre("save",function(next){
 if(!this.isModified("password")){
 return next();
 }
 this.password=bcrpyt.hashSync(this.password,12)
 // bcrpyt.hashSync(this.password,12)
 next()
})
userSchema.methods.comparePassword=function(plaintext,callback){
 return callback(null,bcrpyt.compareSync(plaintext,this.password))
 // bcrypt.compareSync(plaintext,this.password))
}
const userModel=mongoose.model("LoginUSer",userSchema) //name of collections
module.exports=userModel