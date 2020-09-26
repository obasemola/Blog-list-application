const bcrypt = require('bcrypt');
const usersRouter =  require('express').Router();
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 });
  response.json(users)
});

usersRouter.post('/', async (request, response) => {
  const body = request.body;
  const foundUser = await User.findOne({ username: body.username });

  if(body.username.length < 3 || body.password.length < 3){
    return response.status(400).json({ error: 'length of username or password is less than 3' })
  } else if(foundUser) {
    return response.status(400).json({ error: 'Username is already taken' })
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.name,
    name: body.username,
    blogs: 
    passwordHash
  });

  const savedUser = await user.save()
  response.json(savedUser)

});

module.exports = usersRouter