const express = require('express');
const User = require("../models/user.model");

const UserRouter = express.Router()

UserRouter.use(express.urlencoded({extended: true}))
UserRouter.use(express.json())

//Endpoint to get all users for userList
UserRouter.get("/", async (req, res) => {
  try{
    const users = await User.find();
    res.status(200).send(users);
  }
  catch(err){
    res.status(400).send({"message": err.message});
  }
});

// Endpoint to create a new user
UserRouter.post('/', async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
  // Endpoint to retrieve a user by id
  UserRouter.get('/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  // Endpoint to update a user's name or bio by id
  UserRouter.put('/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
  // Endpoint to delete a user by id
  UserRouter.delete('/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  // Endpoint to 
  
  
  
  

module.exports = UserRouter;
