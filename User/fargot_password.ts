import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config();

const sendEmail = async (email:any, subject:string, text:string):Promise<string>=> {
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: 'baldha.shreya027@gmail.com',
              pass: 'Shreya!12345',
            },
          });
        await transporter.sendMail({
            from: "shreyabaldha0@gmail.com",
            to: email,
            subject: subject,
            text: text,
        });
        console.log("email sent sucessfully");  
        return "email sent"; 
    } catch (error) {
        console.log(error, "email not sent");
        return "error";
    }
};

export default sendEmail;

 

