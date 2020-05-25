const restify = require('restify');
const fs = require('fs');
const path = require('path');
var prods = [];
const server = restify.createServer({
    name: 'Tachibana'
});

server.use(restify.plugins.bodyParser()); //must use in order to parse the BODY of the request and get the parameters we need
server.use(restify.plugins.queryParser()); // the same, but with QUERY

server.post('/product', (req, res, next) => {
    var product = {
        id: req.body.id,
        name : req.body.name,
        descript : req.body.descript,
        price : req.body.price
    }
    
    fs.readFile(path.join(__dirname, 'products.json'), (err, data) => {
        if (err) throw err;
        prods = JSON.parse(data);
    })
    console.log(prods);
    prods.push(JSON.stringify(product));
    console.log(prods);
    fs.writeFile(path.join(__dirname, 'products.json'), prods, (err) => {
        if (err) throw err;
    })
    res.send("Added");
    
    next();
})

server.get('/list', (req, res, next) => {
    fs.readFile(path.join(__dirname, "products.json"), (err, data) => {
        if (err) {
            throw err;
        }
        df = JSON.parse(data);
        res.send(df);
        })
})

server.get('/home', (req, res, next)=>{
    res.send("HOME PAGE");
})

server.listen(5000, () => {
    console.log("Server %s is running", server.name);
})
