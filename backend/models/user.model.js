const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = Schema({
    username: {
        type: String,
        required: [true, 'Укажите логин'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Укажите пароль'],
        minLength: [6, 'Минимальная длина пароля 6 символов']
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    }
});

/**
 * Генерация хэша для пароля
 */
UserSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this;
    const saltRounds = 8;

    try {
        if (user.password && user.isModified('password')) user.password = await bcrypt.hash(user.password, saltRounds);
        next();
    } catch (err) {
        next(err);
    }

    /* if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, null, (err, hash) => {
                if (err) return next(err);
                user.password = hash;
                next();
                // await bcrypt.hash(user.password, 8);
            });
        });
    } else {
        next();
    } */
});

module.exports = model('User', UserSchema);
