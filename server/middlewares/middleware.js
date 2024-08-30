const jwt = require('jsonwebtoken');


module.exports.isLogin = (req, res, next)=>{
    try{
        let token = req.headers.authorization;
    let verify = jwt.verify(token, process.env.KEY); 
    if(!verify){
        res.send({error : "login first"});
        return;
    }
    req.user = verify.user
    next();
    }catch(err){
        res.send({error : "Authorization Failed!"});
    }
}