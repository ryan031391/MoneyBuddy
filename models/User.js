const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    icons: {
        type: Array,
        default: [1, 2, 3, 4, 5, 6]
    },
    point: {
        type: Number,
        default: 0
    },
    rewarddate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

const User = mongoose.model('users', UserSchema);
module.exports = User;