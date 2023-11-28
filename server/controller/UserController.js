const User = require('../model/userModel');
const registerModel=require('../model/signUpModel')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const { TOKEN_SECRET } = require('./../config/config.json')


const register = async (req, res) => {
    try {
        console.log(req.body)
        const emailExist = await registerModel.findOne({ email: req.body.email });
        if (emailExist) {
            res.status(400).send("Email already exists");
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new registerModel({
            firstName: req.body.firstName,
            email: req.body.email,
            password: hashedPassword,
            lastName: req.body.lastName,
        })
        await user.save();
        res.status(200).json({ message: "User created" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const user = await registerModel.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ message: "Incorrect Email- ID" });
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send("Incorrect Password");
        const token = jwt.sign({  email: user.email }, TOKEN_SECRET, { expiresIn: 86400 });
        return res.status(200).json({ token, email: user.email});

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
const userList = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const userDetail = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        console.log("sai", req.body)
        const newUser = new User(req.body);
        newUser.Date = new Date();
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.body.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        console.log("body", req.body)
        const deletedUser = await User.findByIdAndDelete(req.params.userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    register,
    login,
    userDetail,
    userList,
    createUser,
    updateUser,
    deleteUser,
};
