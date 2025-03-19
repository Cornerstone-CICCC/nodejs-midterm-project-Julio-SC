"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const getUserByUsername = (req, res) => {
    const { username } = req.session;
    if (!username) {
        res.status(400).json({ error: 'No username found in session!' });
        return;
    }
    const user = user_model_1.default.findByUsername(username);
    if (!user) {
        res.status(404).json({ error: 'User not found!' });
        return;
    }
    res.status(200).json({
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname
    });
};
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ error: 'Username/password is missing!' });
        return;
    }
    const user = yield user_model_1.default.login(username, password);
    if (!user) {
        res.status(401).json({ error: ' invalid credentials!' });
        return;
    }
    if (req.session) {
        req.session.isLoggedIn = true;
        req.session.username = user.username;
    }
    res.status(200).json({ message: 'Succesfully logged in!' });
});
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, firstname, lastname } = req.body;
    if (!username || !password || !firstname || !lastname) {
        res.status(400).json({ error: 'All fields are required!' }); // ✅ Mejor práctica
        return;
    }
    const newUser = yield user_model_1.default.create({ username, password, firstname, lastname });
    if (!newUser) {
        res.status(409).json({ error: 'Username is already taken!' });
        return;
    }
    res.status(201).json(newUser);
});
const logout = (req, res) => {
    if (req.session) {
        req.session = null; // 🔥 Forma correcta con `cookie-session`
        res.status(200).json({ message: 'Successfully logged out' });
    }
    else {
        res.status(400).json({ error: 'No active session found!' });
    }
};
exports.default = {
    getUserByUsername,
    loginUser,
    addUser,
    logout,
};
