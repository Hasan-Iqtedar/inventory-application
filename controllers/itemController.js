var async = require('async');
var Items = require('../models/item');
var Categories = require('../models/category');
var Suppliers = require('../models/supplier');

exports.index = function (req, res, next) {
  async.parallel(
    {
      items: function (callback) {
        Items.countDocuments({}, callback);
      },
      categories: function (callback) {
        Categories.countDocuments({}, callback);
      },
      suppliers: function (callback) {
        Suppliers.countDocuments({}, callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      res.render('index', {
        title: 'Inventory Application',
        total_items: results.items,
        total_categories: results.categories,
        total_suppliers: results.suppliers,
      });
    }
  );
};

exports.itemList = function (req, res, next) {
  Items.find({})
    .sort({ name: 1 })
    .exec(function (err, result) {
      if (err) {
        return next(err);
      }
      res.render('item_list', { title: 'Items', items_list: result });
    });

  // res.send('Not Implemented: Items List');
};

exports.itemDetail = function (req, res, next) {
  Items.findById(req.params.id)
    .populate('category')
    .populate('supplier')
    .exec(function (err, result) {
      if (err) {
        return next(err);
      }
      //No results.
      if (result == null) {
        var error = new Error('Item not found');
        err.status = 404;
        return next(error);
      }
      res.render('item_detail', { title: 'Item Detail', item: result });
    });
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
