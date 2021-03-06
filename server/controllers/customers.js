//Jamaal Bernabe
//11/11/2021

let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let jwt = require("jsonwebtoken");

// create a reference to the model
let Customer = require("../model/customers");

module.exports.displayCustomer = (req, res, next) => {
  Customer.find((err, customerList) => {
    if (err) {
      return console.error(err);
    } else {
      res.json(customerList);
    }
  });
};

module.exports.displayAddCustomer = (req, res, next) => {
  /*
    res.render('book/add', {title: 'Add Book', 
    displayName: req.user ? req.user.displayName : ''});
    */
  res.json({ success: true, msg: "Succesfully Displayed Add Page" });
};

module.exports.processAddCustomer = (req, res, next) => {
  let newCustomer = Customer({
    customerId: req.body.customerId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
  });

  Customer.create(newCustomer, (err, Customer) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.json({ success: true, msg: " Successfully Added " });
    }
  });
};

module.exports.displayEditPage = (req, res, next) => {
  let id = req.params.id;

  Customer.findOne({ customerId: { $eq: id } }, (err, CustomerToEdit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.json(CustomerToEdit);
    }
  });
};

module.exports.processEditPage = (req, res, next) => {
  let id = req.params.id;

  let updatedCustomers = Customers({
    customerId: req.body.customerId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
  });

  Customer.updateOne({ customerId: { $eq: id } }, updatedCustomers, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.json(updatedCustomers);
    }
  });
};

module.exports.performDelete = (req, res, next) => {
  let id = req.params.id;

  Customer.remove({ customerId: { $eq: id } }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.json({ success: true, msg: "Customer Successfully Deleted " });
    }
  });
};
