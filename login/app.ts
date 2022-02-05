
import express from "express";
import dotenv from "dotenv";
import {sequelize} from "./models";
import login from "./login";
const app = express();
import routes from "./router/Rcontactus";
import User_routes from "./router/User";
import session from 'express-session';
import cookieParser from "cookie-parser";
import passport from "passport";
import  passportLocal  from "passport-local";
import {Users} from "./models/user";
import { dbUser } from "./models";
const LocalStrategy = passportLocal.Strategy;

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(session({
    secret:"asdfghjkl",
    resave:true,
    saveUninitialized:true
    })
)

// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new LocalStrategy({
//     usernameField: "email",
//     passwordField: "password",
//   },
//     async function verify(email, password, done) {
//     try{
//        await dbUser.Users
//         .findOne({where: { email: email }})
//         .then((user:Users)=>{
//             if(!user){
//                 return done(null,false,{message:'incoreect email'});
//             }
//             else{
//                 if(user.password !== password){
//                     return done(null,false,{message:'incoreect password'});
//                 }
//             }
//             return done(null, user);
//         })
//         .catch((err:Error)=>{
//             console.log(err);
//             return done(err);
//         });
    
//     }catch(err){
//         return done(err,false)
//     }
// }
// ));
// passport.serializeUser<any,any>((req,user, done)=> {
// done(null,user);
// });
// passport.deserializeUser(async (id:number,done)=>{
// try{
//     const user = await Users.findByPk(id);
//     done(null,user);
// }
// catch(err){
//     done(err,false);
// }
// });

// app.post('/login', 
//   passport.authenticate('local'),
//   function(req, res,err) {
//       try{
//         console.log("login successfully")
//         res.redirect('/');
//       }
//       catch(err){
//           console.log(err);
//       }
    
// });


app.post('/login',login);
app.use('/admin',routes);
app.use('/user',User_routes);


app.listen(process.env.PORT, () => {
    console.log(`Server Start at ${process.env.PORT}`)
    sequelize.authenticate().then(async() => {
        console.log("Database Connected");

        try {
            await sequelize.sync()
        } catch (error) {
            console.log(error)
        }

    }).catch( (e: any) => {
        console.log(e.message)
    })
})
