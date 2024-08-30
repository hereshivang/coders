const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    rooms:
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Room'
            }
        ],
    forkedRooms : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room'
        }
    ]


}, { timestamps: true });


userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10).then((hashPassword) => {
        this.password = hashPassword;
        next();
    }).catch((err) => {
        console.log(err)
        next();
    })
})

const User = mongoose.model('User', userSchema);

module.exports = User;