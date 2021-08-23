const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userSchema = require('../schemas/user');
const storeSchema = require('../schemas/store');
const Config = require('../config');
const { checkToken } = require('../helper/authHelper');

router.post('/login', async (req, res, next) => {
  try {
    const { body: { username, password } } = req;
    if(!(username && password)){
      return res.status(400).send({ error: 'username, password are required fields!' })
    }
    const userObj = await userSchema.findOne({ userName: username, password });
    if (!userObj) return res.status(400).send({error: 'Either username or password is incorrect!'});
    jwt.sign({ id: userObj._id, storeId: userObj.storeId, role: userObj.role }, Config.jwtPrivateKey, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.send({ token: `Bearer ${token}`, message: 'Successfully Logged in!' });
    });
  }
  catch (err) {
    console.log('ERROR: Could not log in');
    return res.status(500).send({error: 'Internal server error occurred!'});
  }
});

router.put('/update', checkToken, function (req, res, next) {
  try {
    const { gender, password, firstName, lastName, storeId } = req.body;
    jwt.verify(req.token, Config.jwtPrivateKey, async (err, authorizedData) => {
      if (err) {
        return res.status(403).send({error: 'Invalid token!'});
      }
      else {
        let obj = {};
        if (gender) obj.gender = gender;
        if (password) obj.password = password;
        if (firstName) obj.firstName = firstName;
        if (lastName) obj.lastName = lastName;
        if (storeId) obj.storeId = storeId;
        await userSchema.findByIdAndUpdate(authorizedData.id, { $set: obj },{new: true});
        res.status(200).send({message: 'User Updated!'});
      }
    })
  }
  catch (err) {
    return res.status(500).send({error: 'Internal server error occurred!'});
  }
});

router.delete('/delete', checkToken, function (req, res, next) {
  try {
    jwt.verify(req.token, Config.jwtPrivateKey, async (err, authorizedData) => {
      if (err) {
        res.sendStatus(403);
      }
      else {
        await userSchema.findByIdAndRemove(authorizedData.id);
        res.send('User deleted!');
      }
    })
  }
  catch (err) {
    return res.status(500).send({error: 'Internal server error occurred!'});
  }
});

router.post('/create', async (req, res, next) =>{
  try {
    const { gender, password, firstName, lastName, userName, email, storeId } = req.body;
    console.log("req.body==========",req.body, userName ,email, password, firstName);
    if (!(userName && email && password && firstName)) {
      console.log("required files");
      return res.status(400).send({error: 'userName, email, password, firstName are required fields!'});
    };
    
    const checkUser = await userSchema.findOne({ $or: [{ email }, { userName }] });
    if (checkUser) return res.status(400).send({error: 'User already exists!'});

    let obj = { gender, password, firstName, lastName, userName, email, role: 'employee', storeId };
    await userSchema.create(obj);
    return res.status(200).send({message: 'User created!'});
  }
  catch (err) {
    return res.status(500).send({error: 'Internal server error occurred!'});
  }
});

router.get('/profile', checkToken, async (req, res, next) => {
  try {
    jwt.verify(req.token, Config.jwtPrivateKey, async (err, authorizedData) => {
      if (err) {
        console.log('ERROR');
        res.sendStatus(403);
      } else {
        const userStore = authorizedData.storeId;
        const userRole = authorizedData.role;

        var descendants = [userStore];
        var stack = [];
        stack.push(userStore);
        while (stack.length > 0) {
          var currentnode = stack.pop();
          var children = await storeSchema.find({ parent: currentnode });

          for (let i = 0; i < children.length; i++) {
            var child = children[i];
            descendants.push(child._id);
            stack.push(child._id);
          }
        }
        let query = { _id: { $ne: authorizedData.id }, storeId: { $in: descendants } };
        if (userRole === 'employee') query.role = userRole;
        let users = await userSchema.find(query);

        users = users && users.map(user => {
          const { firstName, lastName, role, gender, storeId, email } = user;
          return {
            firstName, lastName, role, gender, storeId, email
          }
        });
        res.json({ connectedUsers: users, ...authorizedData });
      }
    })
  }
  catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
