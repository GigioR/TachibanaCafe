const mongoDB = require('mongoose');

//Schema

const ProductSchema = new mongoDB.Schema({
    name : String,
    description : String,
    price : Number
});

module.exports = mongoDB.model('Product', ProductSchema);