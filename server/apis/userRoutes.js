const {Router} = require('express');
const router = Router();
const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { isLogin } = require('../middlewares/middleware');


router.post('/register', async(req, res)=>{
    const {username,  email, password} = req.body;
    if(!email){
        res.send({error : "Email not found"});
        return;
    }

    let user = await User.findOne({email});
    if(user){
        res.send({error : "email alredy registered!"});
        return;
    }

    try{
        user = await User.create({username, email, password});
        let newUser = {
            username : user.username,
            email : user.email,
            rooms : user.rooms,
            forkedRooms : user.forkedRooms
        }
        let token = jwt.sign({user}, process.env.KEY);
        res.send({success : "user created successfuly", user : newUser, token});

    }catch(err){
        res.send({error : err});
    }
})

router.post('/login', async (req, res)=>{
    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            res.send({error : "User not registered."})
            return;
        }

        let result = await bcrypt.compare(password, user.password);
        if(!result){
            res.send({error : "Wrong credintials."});
            return;
        }
        user = {username : user.username, email : user.email, fullname : user.fullname, rooms : user.rooms,
            forkedRooms : user.forkedRooms};
        let token = jwt.sign({user}, process.env.KEY);
        res.send({success : "login successfull",user, token});

    }catch(err){
        console.log(err);
        res.send({error: "Somthing went wrong"});
    }
})









module.exports = router;