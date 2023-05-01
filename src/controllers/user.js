const express = require("express");
const Joi = require('joi')
const { number } = require("joi");
const {Op, where} = require('sequelize');
const jwt = require('jsonwebtoken');
require ("dotenv").config();

const {User} = require("../models");

const register = async (req, res) => {
  const {name, username, password,email,role} = req.body;
  let token = jwt.sign
  ({
    username: username,
    password: password,
    
  }, process.env.JWT_TOKEN_SECRET, {expiresIn: '3600s'})

  
  let idres = await User.findAll
  ({
    where: {
      username, email
    }
  });
  
                        

  const checkusername = (username) => { 
    if(idres.length > 0) {  
        const s = idres.find(idres => {
            return idres.username === username 
        })
        if (s !== undefined) {
            throw new Error("email is not unique")
        }
    }
  } 
  const checkemail = (email) => 
  { 
    if(idres.length > 0) {  
        const s = idres.find(idres => {
            return idres.email === email 
        })
        if (s !== undefined) {
            throw new Error("email is not unique")
        }
    }
  } 
  const checkrole = (role) => 
  { 
    if(role == "labeler" || role == "requester") 
    {  
      throw new Error("role harus labeler/requester")
    }
  }

      const schema = Joi.object
      ({
        
        name: Joi.string().required().messages
        ({
            "any.required": "Semua field wajib diisi",
            
        }),
        password: Joi.string().required().messages
        ({
            "any.required": "Semua field wajib diisi",
            
        }),
        username: Joi.string().required().external(checkusername).messages
        ({
            "any.required": "Semua field wajib diisi",
            
        }),

        email: Joi.string().email().required().external(checkemail).messages
        ({
            "any.required": "Semua field wajib diisi",
            
        }),
        role: Joi.string().required().external(checkrole).messages
        ({
            "any.required": "Semua field wajib diisi",
            
        }),
      })
    
      try 
      {
        await schema.validateAsync(req.body)
      } 
      catch (error)
      {
          return res.status(403).send(error.toString())
      }
    

    

  let user = null
//yuni@istts.ac.id
  
  
   
   
   
   //const usercheck = await useduser(username);
   

      user = await User.create
      ({
        username: username , saldo: 0, name: name ,
        email: email  , credibility: 0 ,  role: role, password: password
      });
    
      return res.status(201).send
      ({
          
          username: username,
          name: name,
          password: password,
          saldo: 0,
          credibility: 0,
          role: role,
          email: email,
          token : token
          
          
          
      });
}

module.exports = {
  register
};