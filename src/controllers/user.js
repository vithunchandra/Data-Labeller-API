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
    if(role == "labeler" && role == "requester") 
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

const login = async (req, res) => {
  const {username, password} = req.body;
  
  let idres = await User.findAll
  ({
    
  });
  
  const checkpass = (password) => { 
    if(idres.length > 0) {  
        const s = idres.find(idres => {
            return idres.password === password 
        })
        if (s == undefined) {
            throw new Error("password salah")
        }
    }
  }                

  const checkusername = (username) => { 
    if(idres.length > 0) {  
        const s = idres.find(idres => {
            return idres.username === username 
        })
        if (s == undefined) {
            throw new Error("user tidak ada")
        }
    }
  } 
  

      const schema = Joi.object
      ({
        
        
        
        username: Joi.string().required().external(checkusername).messages
        ({
            "any.required": "Semua field wajib diisi",
            
        }),

        password: Joi.string().external(checkpass).required().messages
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
   

   let token = jwt.sign
   ({
     username: username
   }, process.env.JWT_TOKEN_SECRET, {expiresIn: '3600s'});
    
      return res.status(201).send
      ({
          
          username: username,
          
          token : token
          
          
          
      });
}

const userDetail = async (req, res) => {
  const {user} = req.body;
  const {username} = req.params;

  let result = undefined;
  if(username){
    result = await User.findByPk(username, {
      attributes: ['username', 'name', 'role', 'credibility']
    });
    if(!result){
      return res.status(404).json({message: "User not found"});
    }
  }else{
    result = {
      username: user.username,
      name: user.name,
      role: user.role,
      credibility: user.credibility
    };
  }

  return res.status(200).json({body: result});
};

const topup = async (req, res) => {
  const {password , saldo} = req.body;
  const {username} = req.params;
  const tokenNow = req.headers["x-auth-token"];
  try {
    userData = jwt.verify(tokenNow, process.env.JWT_TOKEN_SECRET);
  } catch {
    return res.json({
      status: 400,
      message: "unverified",
    });
  }
  let idres = await User.findAll
  ({
    
  });
  
  const checkpass = (password) => { 
    if(idres.length > 0) {  
        const s = idres.find(idres => {
            return idres.password === password 
        })
        if (s == undefined) {
            throw new Error("password salah")
        }
    }
  }                

  const checkusername = (username) => { 
    if(idres.length > 0) {  
        const s = idres.find(idres => {
            return idres.username === username 
        })
        if (s == undefined) {
            throw new Error("user tidak ada")
        }
    }
  } 
  

      const schema = Joi.object
      ({
        
        
        
        saldo: Joi.string().required().messages
        ({
            "any.required": "Semua field wajib diisi",
            
        }),

        password: Joi.string().external(checkpass).required().messages
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
    
      const schema2 = Joi.object
      ({
        
        
        
        username: Joi.string().required().external(checkusername).messages
        ({
            "any.required": "Semua field wajib diisi",
            
        }),

        
      })
    
      try 
      {
        await schema2.validateAsync(req.params)
      } 
      catch (error)
      {
          return res.status(403).send(error.toString())
      }
    

  let user = null
//yuni@istts.ac.id
  
  
  let ceckrole = await User.findOne
  ({
  attributes: ["username" , "role"],
  where: 
  {
    username: username
  }
  });
   
   
  let before_topup = await User.findOne
  ({
    attributes: ["username" , "saldo"],
    where: 
    {
      username: username , role: "requester"
    }
  });
  if (!before_topup) {
    return res.status(400).send('username does not exist / role is not requester')
    
  }
   const nominal = Number(saldo)
    let userup = await User.update
    (
      {
        saldo: before_topup.saldo + nominal ,
      },
      {where: {username: username,}}
      
    );
    
    
    let hasil_topup = await User.findOne
    ({
      attributes: ["username" , "saldo"],
      where: 
      {
        username: username, role: "requester"
      }
    });
      return res.status(201).send
      ({
          
          username: username,
          msg: `berhasil topup saldo sebesar: "${ saldo}" `,
          new_saldo: hasil_topup.saldo ,
          
          
          
          
      });
}


const retrive_money = async (req, res) => {
  const {password , saldo} = req.body;
  const {username} = req.params;
  const tokenNow = req.headers["x-auth-token"];
  try {
    userData = jwt.verify(tokenNow, process.env.JWT_TOKEN_SECRET);
  } catch {
    return res.json({
      status: 400,
      message: "unverified",
    });
  }
  let idres = await User.findAll
  ({
    
  });
  
  const checkpass = (password) => { 
    if(idres.length > 0) {  
        const s = idres.find(idres => {
            return idres.password === password 
        })
        if (s == undefined) {
            throw new Error("password salah")
        }
    }
  }                

  const checkusername = (username) => { 
    if(idres.length > 0) {  
        const s = idres.find(idres => {
            return idres.username === username 
        })
        if (s == undefined) {
            throw new Error("user tidak ada")
        }
    }
  } 
  

      const schema = Joi.object
      ({
        
        
        
        saldo: Joi.string().required().messages
        ({
            "any.required": "Semua field wajib diisi",
            
        }),

        password: Joi.string().external(checkpass).required().messages
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
    
      const schema2 = Joi.object
      ({
        
        
        
        username: Joi.string().required().external(checkusername).messages
        ({
            "any.required": "Semua field wajib diisi",
            
        }),

        
      })
    
      try 
      {
        await schema2.validateAsync(req.params)
      } 
      catch (error)
      {
          return res.status(403).send(error.toString())
      }
    

  let user = null
//yuni@istts.ac.id
  
  
  let ceckrole = await User.findOne
  ({
  attributes: ["username" , "role"],
  where: 
  {
    username: username
  }
  });
   
   
  let before_topup = await User.findOne
  ({
    attributes: ["username" , "saldo"],
    where: 
    {
      username: username , role: "labeller"
    }
  });
  const nominal = Number(saldo)
  if (!before_topup) {
    return res.status(400).send('username does not exist / role is not labeller')
    
  }
  if (before_topup.saldo < nominal) {
    return res.status(400).send('saldo tidak cukup')
    
  }
   
    let userup = await User.update
    (
      {
        saldo: before_topup.saldo + nominal ,
      },
      {where: {username: username,}}
      
    );
    
    
    let hasil_topup = await User.findOne
    ({
      attributes: ["username" , "saldo"],
      where: 
      {
        username: username, role: "labeller"
      }
    });
      return res.status(201).send
      ({
          
          username: username,
          msg: `berhasil menarik saldo sebesar: "${ saldo}" `,
          
          
          
          
      });
}

module.exports = {
  register,
  login,
  userDetail,
  topup,
  retrive_money
};