import jwt from 'jsonwebtoken';
import { Request,Response ,NextFunction} from 'express';


export function generateJWT(req:Request,res:Response,user:any){
    console.log('key',process.env.JWT_ACCESS_TOKEN)
    const token = jwt.sign(user,process.env.JWT_ACCESS_TOKEN as string);
    return res.status(200).json({message : "User signed Up sucesssfully.!",jwt :token});

}
export function authenticateToken(req:Request,res:Response,next:NextFunction){
    const authHeader = req.header('Authorization');
    const token = authHeader?.split(' ')[1];
    if(token==null)return res.status(401).json({"msg":"Not found!"});
    jwt.verify(token,process.env.JWT_ACCESS_TOKEN as string,(err,user:any)=>{
        if(err)return res.status(403).json({"msg":"Not verified!",err});
        req.body.user = user;
        next();
    })
}