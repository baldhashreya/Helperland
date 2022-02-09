
import { NextFunction, Response , Request } from "express";

import  jwt  from "jsonwebtoken";


export const verifyToken = (req:Request, res:Response, next:NextFunction) => {
  const token =
    req.body.token || req.cookies.helperland|| req.headers["x-access-token"];

  if (!token) {
    return res.status(401).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, "djcniwewcdjlwdncjwoc");
    req.user = decoded;
  } catch (err) {
    return res.status(404).send("Invalid Token");
  }
  return next();
};

