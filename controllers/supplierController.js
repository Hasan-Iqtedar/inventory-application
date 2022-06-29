var async = require('async');
var { body, validationResult } = require('express-validator');
var Supplier = require('../models/supplier');
var Item = require('../models/item');

exports.supplierList = function (req, res, next) {
  Supplier.find({})
    .sort({ name: 1 })
    .exec(function (err, result) {
      if (err) {
        return next(err);
      }
      res.render('supplier_list', {
        title: 'Suppliers',
        supplier_list: result,
      });
    });
};

exports.supplierDetail = function (req, res, next) {
  res.send('Not Implemented: supplier Detail: ' + req.params.id);
};

exports.supplierCreateGet = function (req, res, next) {
  res.send('Not Implemented: supplier Create Post');
};

exports.supplierCreatePost = function (req, res, next) {
  res.send('Not Implemented: supplier Create Post');
};

exports.supplierUpdateGet = function (req, res, next) {
  res.send('Not Implemented: supplier Update Post: ' + req.params.id);
};

exports.supplierUpdatePost = function (req, res, next) {
  res.send('Not Implemented: supplier Update Post: ' + req.params.id);
};

exports.supplierDeleteGet = function (req, res, next) {
  res.send('Not Implemented: supplier Delete Post: ' + req.params.id);
};

exports.supplierDeletePost = function (req, res, next) {
  res.send('Not Implemented: supplier Delete Post: ' + req.params.id);
};
