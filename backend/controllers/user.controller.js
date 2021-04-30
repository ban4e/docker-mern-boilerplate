// TODO: refresh token

const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Создание пользователя
 * При успехе возвращает токен
 * @param {*} req
 * @param {*} res
 */
 module.exports.createUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existUser = await User.findOne({ username }).exec();

        if (existUser) {
            res.status(400).json({
                request: {
                    username: 'Используйте другой логин'
                }
            });
        } else {
            const user = new User({ username, password });
            await user.save();
            const token = signToken(user);
            res.status(201).send({ token });
        }
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

/**
 * Логин
 * @param {*} req
 * @param {*} res
 */
module.exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existUser = await User.findOne({ username }).exec();

        if (existUser) {
            const isPasswordMatch = await bcrypt.compare(password, existUser.password);
            if (isPasswordMatch) {
                const token = signToken(existUser);

                res.json({ token });
            } else {
                sendWrongData();
            }
        } else {
            sendWrongData();
        }
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }

    function sendWrongData() {
        res.status(400).json({ 
            request: {
                username: 'Неверный логин или пароль'
            }
        });
    }
}

function signToken(userData) {
    console.log(process.env.JWT_SECRET);
    return jwt.sign({
        username: userData.username,
        id: userData._id
    }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 * 30 }); // 1 month
}
