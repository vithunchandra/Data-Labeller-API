const express = require("express");
const Joi = require('joi')
const { number } = require("joi");
const {Op, where} = require('sequelize');
const jwt = require('jsonwebtoken');
require ("dotenv").config();

const {User, History, Task, Data, Label, UserBlacklist} = require("../models");

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

    // add to topup history
    let history_id = "T" + Date.now();
    const datetime = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
  
    await History.create({
      history_id: history_id,
      username: username,
      amount: saldo,
      date: datetime
    });
    //~~~~~~~~~~~~~~~~~~~~~
      return res.status(201).send
      ({
          
          username: username,
          msg: `berhasil topup saldo sebesar: "${saldo}" `,
          new_saldo: hasil_topup.saldo ,
          
          
          
          
      });
}

const topupHistory = async (req, res) => {
  const histories = await History.findAll({
    where: {
      username: req.body.user.username,
      history_id: {
        [Op.like]: "T%"
      }
    },
    attributes: ["amount","date"]
  })

  return res.status(200).send({histories});
};

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
        saldo: before_topup.saldo - nominal ,
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

    //add to withdraw history
    let history_id = "W" + Date.now();
    const datetime = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
    
    await History.create({
      history_id: history_id,
      username: username,
      amount: saldo,
      date: datetime
    });
    //~~~~~~~~~~~~~~~~~~~~~~
      return res.status(201).send
      ({
          
          username: username,
          msg: `berhasil menarik saldo sebesar: "${ saldo}" `,
          
          
          
          
      });
}

const update_user = async (req, res) => {
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

  let idres = await User.findOne
  ({
    attributes: ["role"],
    where: 
    {
      username: username
    }
  });
  let rolenow = null
  if(idres.role == 'requester') 
  {  
    rolenow = "labeller";
  }
  if(idres.role == 'labeller') 
  {  
    rolenow = "requester";
  }
   

    let userup = await User.update
    (
      {
        role: rolenow ,
      },
      {where: {username: username,}}
      
    );
    
    return res.status(201).send
      ({
          
          username: username,
          msg: `berhasil mengganti role menjadi "${ rolenow}" `,
          
          
          
          
      });
   

    
}


const withdrawHistory = async (req, res) => {
  const histories = await History.findAll({
    where: {
      username: req.body.user.username,
      history_id: {
        [Op.like]: "W%"
      }
    },
    attributes: ["amount","date"]
  })

  return res.status(200).send({histories});
};

const banUser = async (req, res) => {
  const checkrole = (user) => { 
    if(user.role == 'requester') {  
        return true;
    }else{
        throw new Error("Hanya role REQUESTER yang boleh mengakses");
    }
  }

  const checkuser = async (username) => { 
    const user = await User.findByPk(username);

    if(user){
      if(user.role == "labeller"){
        return true;
      }else{
        throw new Error("User role harus LABELLER");
      }
    }else{
      throw new Error("Username tidak terdaftar");
    }
  }

  const checktask = async (task_id) => { 
    const task = await Task.findByPk(task_id);

    if(task){
      return true;
    }else{
      throw new Error("Task tidak terdaftar");
    }
  }

  const istask = async (istask) => { 
    const task = await Task.findByPk(istask.task_id);

    if(task.username == istask.user.username){
      return true;
    }else{
      throw new Error("Task bukan punya anda");
    }
  }

  const is_task_user = async (task_user) => { 
    const blacklist = await UserBlacklist.findOne({
      where: {username: task_user.username, task_id: task_user.task_id}
    })

    if(blacklist){
      throw new Error("Blacklist sudah ada");
    }

    const data = await Data.findAll({
      where: {task_id: task_user.task_id}
    })
    var cek = false;
    for(var i = 0; i < data.length; i++){
      console.log(data[i].data_id);
      const label = await Label.findAll({
        where: {data_id: data[i].data_id}
      })
      for(var j = 0; j < label.length; j++){
        console.log(label[j].username);
        if(label[j].username == task_user.username){
          cek = true;
          break;
        }
      }

      if(cek){
        return true;
      }
    }

    throw new Error(`User yang memiliki username ${task_user.username} tidak pernah melabeli salah satu data pada task dengan task_id ${task_user.task_id}`);
  }

  const schema = Joi.object({
    username: Joi.string().required().external(checkuser).messages
    ({
        "any.required": "Semua field wajib diisi",
    }),
    task_id: Joi.string().required().external(checktask).messages
    ({
        "any.required": "Semua field wajib diisi",
    }),
    user: Joi.object().external(checkrole),
    istask: Joi.object().external(istask),
    is_task_user: Joi.object().external(is_task_user),
  })

  try {
    await schema.validateAsync({...req.body, istask: {task_id: req.body.task_id, user: req.body.user}, is_task_user : {task_id: req.body.task_id, username: req.body.username}})
  } catch (error) {
    return res.status(400).send(error.toString())
  }

  const BD = await UserBlacklist.findAll();
  let ban_id = "BD" + BD.length;
  await UserBlacklist.create({
    ban_id: ban_id,
    username: req.body.username,
    task_id: req.body.task_id
  })

  const user = await User.findByPk(req.body.username);
  await user.update({
    credibility: (user.credibility - 5)
  })

  return res.status(200).send({mag: `User dengan username ${req.body.username} sudah di ban oleh User dengan username ${req.body.user.username}`});
};

const getBanUser = async (req, res) => {
  let result = [];
  if(req.body.user.role == "requester"){
    const blacklists = await UserBlacklist.findAll();
    for (let i = 0; i < blacklists.length; i++) {
      const task = await Task.findByPk(blacklists[i].task_id);
      if(task.username == req.body.user.username){
        result.push(blacklists[i])
      }
    }
  }else{
    const blacklists = await UserBlacklist.findAll({
      where: {username: req.body.user.username}
    })
    for (let i = 0; i < blacklists.length; i++) {
      const task = await Task.findByPk(blacklists[i].task_id);
      result.push({
        task_id: blacklists[i].task_id,
        owner_of_task: task.username
      })
    }
  }
  return res.status(200).send({blacklists: result});
};

const removeBan = async (req, res) => {
  const checkrole = (user) => { 
    if(user.role == 'requester') {  
        return true;
    }else{
        throw new Error("Hanya role REQUESETER yang boleh mengakses");
    }
  }

  const checkban = async (ban_id) => { 
    const ban = await UserBlacklist.findByPk(ban_id);

    if(ban){
      return true;
    }else{
      throw new Error("Blacklist tidak ada");
    }
  }

  const isban = async (isban) => { 
    const ban = await UserBlacklist.findByPk(isban.ban_id);
    const task = await Task.findByPk(ban.task_id);
    
    if(task.username == isban.user.username){
      return true;
    }else{
      throw new Error("Blacklist is not yours");
    }
  }

  const schema = Joi.object({
    ban_id: Joi.string().required().external(checkban).messages
    ({
        "any.required": "Semua field wajib diisi",
    }),
    user: Joi.object().external(checkrole),
    isban: Joi.object().external(isban)
  })

  try {
    await schema.validateAsync({...req.body, isban: {user: req.body.user, ban_id: req.body.ban_id}})
  } catch (error) {
    return res.status(400).send(error.toString())
  }

  await UserBlacklist.destroy({
    where: {ban_id: req.body.ban_id}
  })

  res.status(200).send({msg: `Blacklist sudah dicabut`});
};


module.exports = {
  register,
  login,
  userDetail,
  topup,
  topupHistory,
  retrive_money,
  update_user,
  withdrawHistory,
  banUser,
  getBanUser,
  removeBan
};