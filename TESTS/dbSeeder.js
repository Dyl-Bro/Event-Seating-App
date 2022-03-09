const { User } = require ( "../MODELS/user");
const mongoose = require('mongoose');
const {ObjectId} = require('mongodb');
require('dotenv/config');
const jwt = require('jsonwebtoken');
const { Table } = require("../MODELS/tables");


const seedUserId = new ObjectId();
const seedTableId = new ObjectId();

module.exports.seeduserID = seedUserId;


const user = new User ({
    _id : seedUserId, 
    name : 'seedUser',
    email : 'seedUser@gmail.com',
    password : 'seedUserPassword'
})
module.exports.token = jwt.sign(
    {userId: user._id},//want id to be identifier for jwt
    process.env.SECRET,
    {expiresIn : '1d'}
)




console.log("SEED AUTH TOKEN--------> " + module.exports.token);
module.exports.seedData = () => {
    try {
        user.save();
    
    } catch (err) {
      console.error(err);
    }
    console.log("Mock data is seeded from dbSeeder file: ");
    console.log(user);

  };