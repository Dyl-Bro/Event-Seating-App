const express = require('express');
const router = express.Router();
const {User} = require ('../MODELS/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post(`/register`, (req, res) => {
    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, 10 )
    })
    if(req.body.name == null || req.body.password ==null || req.body.email == null){
        return res.status(400).send('client error, User cannot be registered');
    } 
    user.save()
    .then((newlyCreatedUser => {
        res.status(200).json(newlyCreatedUser)
    })).catch((err)=>{
        res.status(500).json({
            error: err,
            success:false
        })
    })
});
router.post(`/login`, async (req, res) => {
    const user = await User.findOne({email: req.body.email})
    const secret = process.env.SECRET;
    if(!user){
        return res.status(400).send('No user found')
    }
    if(user && bcrypt.compareSync(req.body.password, user.password)){
        const token = jwt.sign(
            {userId: user.id},//want id to be identifier for jwt
            secret,
            {expiresIn : '1d'}
        )
        res.status(200).send({user: user.email, token: token});
    } else {
        res.status(400).send('Unable to Authenticate User')
    }

});

router.get(`/:id`, async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if(!user){
        res.status(500).json({success: true, message:'User not found' })
    }
    res.status(200).send(user);
});

module.exports = router;