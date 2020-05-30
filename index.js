const restify = require("restify");
const fs = require("fs");
const path = require("path");

const ProductController = require('./controller/ProductController')

const mongoDB = require('mongoose')
mongoDB.connect("mongodb+srv://tachibana:tachibana@gigio-yhbyz.mongodb.net/tachibana?retryWrites=true&w=majority", 
    {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('Connected to Mongo');
});


const server = restify.createServer({
  name: "Tachibana",
});

server.use(restify.plugins.bodyParser()); //must use in order to parse the BODY of the request and get the parameters we need
server.use(restify.plugins.queryParser()); // the same, but with QUERY

server.post("/products", async (req, res, next) => {
  ProductController.store(req, res);
  next();
});

server.get("/products", (req, res, next) => {
  ProductController.readAll(req, res);
  next();
});


server.post("/productsById", (req, res, next) => {
  ProductController.readOne(req, res);
  next();
});

server.post("/deleteProd", (req, res, next) => {
  ProductController.deleteProd(req, res);
  next();
});

server.patch("/patchProd", (req, res, next) => {
  ProductController.update(req, res);
  next();  
});


server.get("/home", (req, res, next) => {
  res.send("HOME PAGE");
});

server.listen(5000, () => {
  console.log("Server %s is running", server.name);
});
