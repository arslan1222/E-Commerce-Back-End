const userModel = require("../models/category.model.js");
const jwt = require("jsonwebtoken");
const auth = require("../config/db.config.js");

// This middelware will check the user credencials

const verifySignUpBody = async (req, res)=>{
    try {

        if(!req.body.name){
            return res.status(400).send({
                message: "Failed! name is not provided"
            })
        }

        if(!req.body.email){
            return res.status(400).send({
                message: "Error! email is not provided"
            })
        }

        if(!req.body.userId){
            return res.status(400).send({
                message: "Failed! user id is not provided"
            })
        }

        const user = await userModel.findOne({userId: req.body.userId});

        if(user){
            return res.status(400).send({
                message: "The user user id is already existed!"
            });
        }
        next();
        
    } catch (error) {
        log("Error while validating the request body!", error)
        res.status(500).send({
            message: "Error while validating the request body!"
        });
        
    }
}


const verifySignInBody = (req, res, next)=>{

    if(!req.body.userId){
        return res.status(400).send({
            message: "Failed! User id is not provided"
        })
    }

    if(!req.body.password){
        return res.status(400).send({
            message: "Failed! password is not provided"
        })
    }
    next();
}

const verifyToken = (req, res, next)=>{

    const token = req.headers["x-access-token"];

    if(!token){
        res.status(403).send({
            message: "Token not found! unauthorized"
        });
    }

    jwt.verify(token, "My secret", async(error, decoded)=>{
        if(error){
            return res.status(400).send({
                message: "Unauthorized!"
            })
        }
        const user = await userModel.findOne({userId: decoded.id});
        if(!user){
            return res.status(400).send({
                message: "Unauthorized! The user for this token is not exist"
            })
        }
        req.user = user;
        next();
    });
    
}

    const isAdmin = (req, res, next)=>{
        const user = req.user;
        if(user & userType == "ADMIN"){
            next()
        } else {
            res.status(400).send({
                message: "Only Admin allows access to this endpoint!"
            })
        }
    }


module.exports = {
    verifySignUpBody : verifySignUpBody,
    verifySignInBody : verifySignInBody,
    verifyToken : verifyToken,
    isAdmin : isAdmin
}