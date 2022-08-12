import { RequestHandler } from 'express';
import { toJSON } from 'flatted';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import UserModel, { IUser } from '../models/User';

function createToken(user: IUser) {
    return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
        expiresIn: 900 // 15min
    });
}

export const signUp: RequestHandler = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json();

        const user = await UserModel.findOne({ email });
        if (user) return res.status(303).json();

        const newUser = new UserModel({ email, password });
        await newUser.save();
        return res.status(201).json();
    } catch (error) {
        return res.status(500).json(toJSON(error));
    }
};

export const signIn: RequestHandler = async (req, res) => {
    try {
        const scripts = [{ script: '/js/signin.js' }]
        return res.status(200).render('signin', { title: "Sign In", scripts });
    } catch (error) {
        return res.status(500).json(toJSON(error));
    }
};

export const logIn: RequestHandler = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json();

        const userFound = await UserModel.findOne({ email });
        if (!userFound) return res.status(404).json();

        const auth = await userFound.comparePassword(password);
        if (!auth) return res.status(400).json();

        const tokenCreated = createToken(userFound);

        return res.status(200).cookie('jwt', tokenCreated, { expires: new Date(Date.now() + 900000), httpOnly: true, path: "payment" }).json({ jwt: tokenCreated });
    } catch (error) {
        return res.status(500).json(toJSON(error));
    }
};