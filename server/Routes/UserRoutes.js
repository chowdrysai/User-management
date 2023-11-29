const app = require('express').Router();
const { userSchema } = require('../Schema/PostSchema');
const { loginSchema } = require('../Schema/signIn');
const { registerSchema } = require('../Schema/signUp');
const {
    userList, userDetail, createUser, deleteUser, updateUser, login, register,
} = require('../controller/UserController');
const { validate } = require('../middleware/ValidationHandle');
const { verifyAuth } = require('../middleware/VerifyAuth');

app.post('/login', validate(loginSchema, 'body'), login);
app.post('/register', validate(registerSchema, 'body'), register);
app.get('/api/users', verifyAuth, userList);
app.delete('/api/users/:userId', deleteUser);
app.patch('/api/users/:userId', updateUser);
app.get('/api/users/:userId', userDetail);
app.post('/api/users', validate(userSchema, 'body'), verifyAuth, createUser);

module.exports = app;
