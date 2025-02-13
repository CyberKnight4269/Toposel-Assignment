const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
    {
        username: {
            unique: true,
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        fullName: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        date_of_birth: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        }
    }
)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {expiresIn: '1h'})
    return token
}

userSchema.methods.generateRefreshToken = function () {
    const refreshToken = jwt.sign({ id: this._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '4d' })
    return refreshToken;
}

const User = mongoose.model('User', userSchema)

module.exports = User