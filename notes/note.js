JWT Token

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
            message: "Your is incorrect!"
        })
    }
    
}



customer and Admin
If you have token you can'y do it
to check this the middelware is used