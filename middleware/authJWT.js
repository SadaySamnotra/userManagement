const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authorize = (roles=[])=>{
    return (req,res,next)=>{
        try{
            const token = req.cookies.token;
            if(!token){
                return res.status(401).json({error:"Unauthorized access"});
            }
            const decoded = jwt.verify(token,JWT_SECRET);
            if(!roles.includes(decoded.userType)){
                return res.status(403).json({error:"Forbidden access."});
            }
            req.user = decoded;
            next();
        }catch(error){
            console.error(error);
            res.status(500).json({error:"Internal status error."});
        }
    }
};


module.exports = authorize;
