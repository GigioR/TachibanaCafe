const Product = require('../models/Product');

async function store (req, res) {
    const {name, description, price} = req.body;
    var productFiltered = await Product.create({
        name,
        description,
        price
    })

    console.log(productFiltered);   
    return res.json(productFiltered);
}

async function readAll (req, res) {
    const data = await Product.find();
    return res.json(data);
}

async function readOne (req, res) {
    const { name } = req.query;
    const data = await Product.findOne({name});

    return res.json(data);
}

async function deleteProd (req, res) {
    const { id } = req.params;

    const data = await Product.deleteOne({_id:id});

    return res.json(data);
}

async function update(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    const data = await Product.findOne({_id:id});

    if(data) {
        data.name = name;
        Product.update({data});
    }
    else { 
        res.send("Product Not Found");
    }

    return res.json(data);
}

module.exports = {
    store,
    readAll,
    readOne,
    deleteProd,
    update
}