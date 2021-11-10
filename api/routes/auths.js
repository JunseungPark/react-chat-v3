const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");


//레지스터
router.post("/register", async (req,res)=> {
    try {
        // 새로운패스워드 생성
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        //새로운 유저 생성
        const newUser = await new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
        })

        //유저 저장 몽고 디비 
        const user = await newUser.save();
        res.status(200).json(user);

    } catch(err) {
        console.log(err)
    }
})

//로그인 
router.post("/login", async (req, res) => {
    try {
        
        const user = await User.findOne({ email: req.body.email});
        !user && res.status(404).json("user not found");

        const vaildPassword = await bcrypt.compare(req.body.password, user.password)
        !vaildPassword && res.status(400).json("wrong password");
        
        res.status(200).json(user);

    } catch(err) {
        console.log(err)
    }
})

module.exports = router