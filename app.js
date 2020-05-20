const express = require("express");
const bodyParser = require("body-parser");
var fs = require("fs");

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.post("/orders", async (req, res) => {
  try {
    if (req.body.user != null) {
      const rp = require("request-promise");
      var toSend;
      if (req.body.user.id == null) {
        toSend = {
          id: Math.floor(Math.random() * Math.floor(100000)),
          surname: req.body.user.surname,
          name: req.body.user.name,
          number: req.body.user.number,
          email: req.body.user.email,
        };
        var options = {
          method: "POST",
          uri: "http://contacts:5000/contacts",
          json: true, // Automatically parses the JSON string in the response
          body: toSend,
        };

        rp(options)
          .then(async function (data) {
            try {
              const order = await new Order({
                dishes: req.body.dish,
                user: options.body.id,
              }).save();
              if (!order) {
                res.status(404).send();
              } else {
                res.status(201).send(order);
              }
            } catch (exception) {
              console.log(exception);
              res.status(500).send();
            }
          })
          .catch(async function (err) {
            try {
              const order = await new Order({
                dishes: req.body.dish,
              }).save();
              if (!order) {
                res.status(404).send();
              } else {
                res.status(201).send(order);
              }
            } catch (exception) {
              console.log(exception);
              res.status(500).send();
            }
          });
      } else {
        try {
          const order = await new Order({
            dishes: req.body.dish,
            user: req.body.user.id,
          }).save();
          if (!order) {
            res.status(404).send();
          } else {
            res.status(201).send(order);
          }
        } catch (exception) {
          console.log(exception);
          res.status(500).send();
        }
      }
    } else {
      try {
        const order = await new Order({
          dishes: req.body.dish,
        }).save();
        if (!order) {
          res.status(404).send();
        } else {
          res.status(201).send(order);
        }
      } catch (exception) {
        console.log(exception);
        res.status(500).send();
      }
    }
  } catch (exception) {
    console.log(exception);
    if (exception.name == "CastError") {
      res.status(400).send("Bad request");
    }
    res.status(500).send("An error occured our side!");
  }
});

app.get("/orders", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.find().exec();
    if (!order) {
      res.status(404).send();
    } else {
      res.status(200).send(order);
    }
  } catch (exception) {
    console.log(exception);
    if (exception.name == "CastError") {
      res.status(400).send("Bad request");
    }
    res.status(500).send("An error occured our side!");
  }
});

app.get("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({ _id: id }).exec();
    if (!order) {
      res.status(404).send();
    } else {
      //res.status(200).send(order);
      if (order.user != null && req.body.user == 1) {
        const rp = require("request-promise");
        var options = {
          method: "GET",
          uri: "http://contacts:5000/contacts/" + order.user,
        };

        rp(options)
          .then(async function (data) {
            data = JSON.parse(data);
            res.status(200).send({ order: order, contacts: data });
          })
          .catch(async function (err) {
            order.user = err;
            res.status(200).send(order);
          });
      } else {
        res.status(200).send(order);
      }
    }
  } catch (exception) {
    console.log(exception);
    if (exception.name == "CastError") {
      res.status(400).send("Bad request");
    }
    res.status(500).send("An error occured our side!");
  }
});

app.patch("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOneAndUpdate(
      { _id: id },
      { served: true },
      { new: true }
    ).exec();
    if (!order) {
      res.status(404).send();
    } else {
      res.status(200).send(order);
    }
  } catch (exception) {
    console.log(exception);
    if (exception.name == "CastError") {
      res.status(400).send("Bad request");
    }
    res.status(500).send("An error occured our side!");
  }
});

app.put("/orders", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    }).exec();
    if (!order) {
      res.status(404).send();
    } else {
      res.status(200).send(order);
    }
  } catch (exception) {
    console.log(exception);
    if (exception.name == "CastError") {
      res.status(400).send("Bad request");
    }
    res.status(500).send("An error occured our side!");
  }
});

app.delete("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete({ _id: id }).exec();
    if (!order) {
      res.status(404).send();
    } else {
      res.status(204).send(order);
    }
  } catch (exception) {
    console.log(exception);
    if (exception.name == "CastError") {
      res.status(400).send("Bad request");
    }
    res.status(500).send("An error occured our side!");
  }
});

app.get("/test", async (req, res) => {
  const rp = require("request-promise");
  var options = {
    method: "GET",
    uri: "http://contacts:5000/contacts",
    json: true, // Automatically parses the JSON string in the response
  };

  rp(options)
    .then(function (data) {
      res.status(200).send(data);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
});

const mongoose = require("mongoose");
const Order = require("./models/order.js").Order;
const DB_URI = "mongodb://mongo:27017/ordersApp";
const soap = require("soap");

async function getOrder(args) {
  const order = await Order.findOne(args).exec();
  console.log(order);
  return {
    id: args._id,
    served: order.served,
    user: order.user,
    dishes: order.dishes,
  };
}

async function createOrder(args) {
  const order = await new Order({
    dishes: args.dish,
  }).save();
  console.log(order);
  return {
    id: order._id.toString(),
    served: order.served,
    user: order.user,
    dishes: order.dishes,
  };
}

async function deleteOrder(args) {
  console.log(args);
  const order = await Order.findByIdAndDelete(args._id).exec();
  return;
}

// the service
var serviceObject = {
  OrderService: {
    OrderServiceSoapPort: {
      Order: getOrder,
      CreateOrder: createOrder,
      DeleteOrder: deleteOrder,
    },
  },
};

// load the WSDL file
var xml = fs.readFileSync("service.wsdl", "utf8");

mongoose.connect(DB_URI).then(() => {
  console.log("APP IS RUNNING");
  try {
    const order = new Order({
      dishes: "Cheese sticks",
      user: 11234,
    }).save();
  } catch (exception) {
    return;
  }
  app.listen(5000);
  var wsdl_path = "/wsdl";
  soap.listen(app, wsdl_path, serviceObject, xml);
  console.log(
    "Check http://localhost:" +
      5000 +
      wsdl_path +
      "?wsdl to see if the service is working"
  );
});
