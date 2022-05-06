const {User , Sequelize} = require("./../models");
const bycryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signUp = (req, res) => {

    User.findOne({where : {email:req.body.email}}).then(result => {
        if(result){
            res.status(409).json({                      // 409 conflict
                message : "Email already taken."
            })
        }
        else{
            bycryptjs.genSalt(10, (err, salt)=>{
                bycryptjs.hash(req.body.password, salt, (err, hash) => {     //salt helps to add random string to end of the plain text password
                    const user = {
                        name : req.body.name,
                        email : req.body.email,
                        password : hash
                    }
                
                    User.create(user).then(result => {
                        res.status(201).json({
                            message : "User registered Successfully" 
                        })
                    })
                    .catch(error => {
                        res.status(500).json({
                            message : "Problem occured while registering user."
                        })
                    })
                })
            })
        }
    }).catch(error => {
        res.status(500).json({
            message : "Problem occured while registering user."
        })
    }) 
}

exports.login=(req, res) => {
    User.findOne({where : {email:req.body.email}}).then(user => {
        if(user === null){
            res.status(401).json({          // 401 unauthirized user
                message : "Invalid Email or Password."
            })
        }
        else{
            bycryptjs.compare(req.body.password, user.password, (err, result)=>{
                if(result){
                    const token = jwt.sign({
                        email : user.email,
                        userId : user.id
                    }, 'secret', (err, token) => {
                        res.status(200).json({          
                            message : "Authentication Successfull.",
                            token : token
                        })
                    })
                }
                else{
                    res.status(401).json({          // 401 unauthirized user
                        message : "Invalid Email or Password."
                    })
                }
            })
        }

    }).catch(error => {
        res.status(500).json({
            message : "Problem occured while logging user."
        })
    })
}
