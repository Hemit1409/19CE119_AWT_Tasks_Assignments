const express = require('express')
const bodyParse = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
// database
var User=require("./Modal/User")
var app = express();
app.set('port',5555);

app.use(express.urlencoded({
extended:true
}))
app.use(cookieParser())
app.use(session({
key:"user_id",
secret:"RandomSecretKey",
resave:false,
saveUninitialized:false,
cookie:{
expires:600000,
},
}))
var sessionChecker=(req,res,next)=>{
if(req.session.user && req.cookies.user_id){
res.redirect("/dashboard")
} //is there any session created for user ? and is there any cookie created at server side for that user
else{
next()
}
}
//routes
app.get('/',sessionChecker,(req,res)=>{
res.redirect("/login")
})
app.route("/login")
.get(sessionChecker,(req,res)=>{
res.sendFile(__dirname+"/Views/login.html")
})
.post(async(req,res)=>{
var username = req.body.username,
password = req.body.password
try{
var user=await User.findOne({username:username}).exec(); //Select username where loginuser='Nikita'
if(!user){
res.send("User doesn't exist. sign up")
// res.send('<script>alert("USer doesn\'t matched")</script>')
res.redirect("/login")
}
else{
// res.send("User exists")
// res.send('<script>alert("User MAtched")</script>')
user.comparePassword(password,(error,match)=>{
if(!match){
res.send("User exists but password doesn't matched. try again");
// res.send('<script>alert("Password doesnt matched")</script>')
res.redirect("/login")
}
res.send("Login Successfully");
// res.send('<script>alert("password Matched")</script>')
})
req.session.use=user;
res.redirect("/dashboard")
}
} catch(error){
console.log(error);
}
})
app.route("/signup")
.get(sessionChecker,(req,res)=>{
res.sendFile(__dirname+"/Views/Signup.html")
})
.post((req,res)=>{
var user=new User({
username:req.body.username,
email:req.body.email,
 password:req.body.password
 })
 user.save((err,doc)=>{
 if(err){
 console.log(err);
 res.redirect("/signup")
 }else{
 req.session.user=doc
 res.redirect("/dashboard")
 }
 })
})
app.get("/dashboard",(req,res)=>{
 if(req.session.user && req.cookies.user_id){
 res.sendFile(__dirname+"/Views/dashboard.html")
 }else{   
 res.redirect("/login")
 }
})
app.get("/logout",(req,res)=>{
 if(req.session.user && req.cookies.user_id){
 res.clearCookie("user_id")
 res.redirect("/")
 }else{
 res.redirect("/login")
 }
})
app.use(function(req,res,next){
 res.status(404).send("Sorry can't found the resources you want")
})
app.listen(app.get('port'),()=>
 console.log(`Login Demo running on port no: ${app.get('port')}`)
)