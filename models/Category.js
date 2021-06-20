const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    icon: {
        type: Number,
        required: true
    }
})

const Category = mongoose.model('categories', CategorySchema);
module.exports = Category;