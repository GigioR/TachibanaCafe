const restify = require("restify");
const fs = require("fs");
const path = require("path");

const server = restify.createServer({
  name: "Tachibana",
});

server.use(restify.plugins.bodyParser()); //must use in order to parse the BODY of the request and get the parameters we need
server.use(restify.plugins.queryParser()); // the same, but with QUERY

server.post("/products", async (req, res, next) => {
  var product = {
    id: req.body.id,
    name: req.body.name,
    descript: req.body.descript,
    price: req.body.price,
  };

  let data = fs.readFileSync(path.join(__dirname, "products.json")).toString();

  let prods = JSON.parse(data);

  prods.push(product);

  data = JSON.stringify(prods);

  fs.writeFile(path.join(__dirname, "products.json"), data, (err) => {
    if (err) throw err;
  });

  res.send("Added");

  next();
});

server.get("/products", (req, res, next) => {
  fs.readFile(path.join(__dirname, "products.json"), (err, data) => {
    if (err) {
      throw err;
    }
    df = JSON.parse(data);
    res.send(df);
  });
  next();
});


server.post("/productsById", (req, res, next) => {
  var id = req.body.id
  console.log(id);
  fs.readFile(path.join(__dirname, "products.json"), (err, data) => {
    if (err) {
      throw err;
    }
    df = JSON.parse(data);
    console.log(df);
    df.forEach(element => {
      if(id == element.id) res.send(element);
    });
  });
  next();
});

server.post("/deleteProd", (req, res, next) => {
  var id = req.body.id;
  console.log(id);
  
  fs.readFile(path.join(__dirname, "products.json"), (err, data) => {
    if (err) throw err;
    df = JSON.parse(data);
    console.log(df);
    var indice = 0
    df.forEach((element, index) => {
      if(id == element.id) {
        indice = index;  
      }
    })
    df.splice(indice, 1)

    console.log(indice)

    res.send(df);
  })

  next();
});

server.patch("/patchProd", (req, res, next) => {
  var id = req.query.id;
  var name = req.query.name;
  
  fs.readFile(path.join(__dirname, "products.json"), (err, data) => {
    if (err) throw err;
    df = JSON.parse(data);
    df.forEach(element => {
      if (id == element.id) {
        element.name = name;
        res.send(element);  
      }
    })
  });
  
  
  
});


server.get("/home", (req, res, next) => {
  res.send("HOME PAGE");
});

server.listen(5000, () => {
  console.log("Server %s is running", server.name);
});
