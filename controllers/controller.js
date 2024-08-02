const user_model = require("../models/category.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    const request_body = req.body;

    const userObj = {
        name: request_body.name,
        userId: request_body.userId,
        email: request_body.email,
        password: bcrypt.hashSync(request_body.password, 8),
        userType: request_body.userType
    };

    try {
        const user_created = await user_model.create(userObj);

        const otherUser = {
            name: request_body.name,
            userId: request_body.userId,
            email: request_body.email,
            userType: request_body.userType
        };
        res.status(201).send(otherUser);
    } catch (err) {
        console.log("Error", err);
        res.status(500).send({
            message: "Some error happened while registering the user"
        });
    }
};


exports.signIn = async (req, res)=>{
    const user = await user_model.findOne({userId: req.body.userId});

    if(user == null){
        res.status(400).send({
            message: "Yhis user id is not valid!"
        });
    }

    // is password correct?
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

    if(!isPasswordValid){
    res.status(401).send({
        message: "Your password is incorrect!"
    });
}

    const token = jwt.sign({id: user.userId},"my secret", {
    expiresIn: 120
    });

    res.status(200).send({
        name: user.name,
        userId: user.userId,
        email: user.email,
        userType: user.userType,
        accessToken: token
    })

}

