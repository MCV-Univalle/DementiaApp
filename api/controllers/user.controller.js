const mongoose = require('mongoose');
const User = require('../models/user.model');
const service = require('../services/jwt.service');
const bcrypt = require('bcrypt');

//Input validator
const validateRegisterInput = require('../validators/register');
const validateLoginInput = require('../validators/login');


exports.create = function (req, res) {

    let {errors, isValid} = validateRegisterInput(req.body);

    //Check validation
    if(!isValid){
        return res.status(400).json(errors);
    }   

    User.findOne({cc: req.body.cc}).then(user => {
        if(!user){
            const user = new User(
                {
                    name: req.body.name,
                    last_name: req.body.last_name,
                    password: req.body.password,
                    cc: req.body.cc,
                    dementia_stage: req.body.dementia_stage,
                    adress: req.body.adress,
                    birthdate: req.body.birthdate,
                }
            )
            
            user.save(function (err) {
                if (err) {
                    return res.status(500).send({message: `Error creating the user ${err}`});
                    
                }
                //Send the token create for the user
                console.log(`${user}`);
                
                res.status(200).send( {token: service.createToken(user)});
            })

        } else {
            return res.status(400).json({cc : "Ya existe un usuario asociado a la identificación"});
        }
    })
    
}

exports.login = function(req, res){

    let {errors, isValid} = validateLoginInput(req.body);

    //Check validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({cc: req.body.cc})
    .then((user,err) => {
        if(err) return res.status(500).send( {message:err} )
        if(!user) return res.status(404).send( {message:'El usuario no existe, debe registrarse'} )

        bcrypt.compare(req.body.password, user.password, function(err, isMatch){
            if(isMatch){
                
                req.user = user
                res.status(200).send( {
                    token: service.createToken(user),
                    message: 'Te has logueado correctamente'
                });
            }
            else {
                return res.status(400).send( {passwordincorrect:'Contraseña incorrecta'});
            }
        }
            
        )
    })
    .catch((err) => {
        console.error(err);
    });
}

