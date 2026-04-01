const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_CONFIG = require('../config/jwt.config')
const { BCRYPT_SALT_ROUNDS } = require('../constant/index')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: 8
    },
    bio: {
        type: String,
        default: ""
    },
    profilePic: {
        type: String,
        default: function () {
            return `https://api.dicebear.com/7.x/initials/svg?seed=${this.name || "User"}`;
        }
    },
    refreshToken: {
        type: String,
        default: null,
        select: false
    }
}, { timestamps: true });


userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);

});

userSchema.methods.generateRefreshToken = function () {
    const token = jwt.sign({ id: this._id }, JWT_CONFIG.REFRESH.SECRET, { expiresIn: JWT_CONFIG.REFRESH.EXPIRY });
    return token;
};

userSchema.methods.generateAccessToken = function () {
    const token = jwt.sign({ id: this._id }, JWT_CONFIG.ACCESS.SECRET, { expiresIn: JWT_CONFIG.ACCESS.EXPIRY });
    return token;
};

userSchema.methods.setRefreshToken = async function (token) {
    this.refreshToken = await bcrypt.hash(token, BCRYPT_SALT_ROUNDS)
};

userSchema.methods.compareRefreshToken = async function (token) {
    return await bcrypt.compare(token, this.refreshToken)
};

userSchema.methods.comparePassword = async function (password) {
    const comparePassword = await bcrypt.compare(password, this.password);
    return comparePassword;
};

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    delete obj.refreshToken;
    return obj;
};


module.exports = mongoose.model('User', userSchema);