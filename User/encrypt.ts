
import { NextFunction, Response , Request } from "express";
import bcrypt from 'bcryptjs';
import  jwt, { JwtPayload }  from "jsonwebtoken";
import jwt_decode from "jwt-decode";

export function Token(data:any){
  const token = jwt.sign({
    name: data.FirstName,
    email: data.email,
    userId: data.id
  },`${process.env.JWT_KEY}`,{
    expiresIn:"1d"
  });
  return token;
}

export function Token1(data:string){
  const token = jwt.sign({
    userId: data
  },`${process.env.JWT_KEY}`,{
    expiresIn:"1d"
  });
  return token;
}


export const verifyToken = (req:Request, res:Response, next:NextFunction) => {
  const token = req.cookies.helperland

  if (!token) {
    return res.status(401).send("Login is required");
  }
  try {
    const decoded = jwt.verify(token, "djcniwewcdjlwdncjwoc");
    req.user = decoded;
  } catch (err) {
    return res.status(404).send("Invalid Token");
  }
  return next();
};

export function user_id(data:string){
   try{
    const decode= jwt_decode<JwtPayload>(data);
    if(decode){
      //console.log(decode);
      return decode.userId;
    }
   } 
   catch(err){
     console.log("Error");
   } 
}

export async function encrypt(data:string){
  return await bcrypt.hash(data,10);
}

export  async function decrypt(data:string,data1:string){
  return  await bcrypt.compare(data,data1);
}


