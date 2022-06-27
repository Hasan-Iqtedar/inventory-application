var async = require('async');
var Items = require('../models/item');
var Categories = require('../models/category');
var Suppliers = require('../models/supplier');

exports.index = function (req, res, next) {
  res.send('Not Implemented: Home Page')
};

exports.itemList = function (req, res, next) {
  res.send('Not Implemented: Items List');
};

exports.itemDetail = function (req, res, next) {
  res.send('Not Implemented: Item Detail: ' + req.params.id);
};

exports.itemCreateGet = function (req, res, next) {
  res.send('Not Implemented: Item Create Post');
};

exports.itemCreatePost = function (req, res, next) {
  res.send('Not Implemented: Item Create Post');
};

exports.itemUpdateGet = function (req, res, next) {
  res.send('Not Implemented: Item Update Post: ' + req.params.id);
};

exports.itemUpdatePost = function (req, res, next) {
  res.send('Not Implemented: Item Update Post: ' + req.params.id);
};

exports.itemDeleteGet = function (req, res, next) {
  res.send('Not Implemented: Item Delete Post: ' + req.params.id);
};

exports.itemDeletePost = function (req, res, next) {
  res.send('Not Implemented: Item Delete Post: ' + req.params.id);
};
