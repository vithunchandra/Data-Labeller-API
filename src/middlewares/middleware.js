const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {User} = require('../models/index');
dotenv.config();

const authorization = async (req, res, next) => {
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({message: "Not Authorized"});
    }
    let tokenData = undefined;
    try{
        tokenData = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    }catch(error){
        return res.status(401).json({message: "Invalid JWT Token"});
    }

    const user = await User.findByPk(token.user_id);
    if(!user){
        return res.status(404).json({message: "User not found"});
    }
    req.body.user = user;
    next();
};

module.exports = {
    authorization
};