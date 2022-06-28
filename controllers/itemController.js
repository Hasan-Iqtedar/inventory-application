var async = require('async');
var Items = require('../models/item');
var Categories = require('../models/category');
var Suppliers = require('../models/supplier');
var { body, validationResult } = require('express-validator');

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
  // res.send('Not Implemented: Item Create Post');

  async.parallel(
    {
      suppliers: function (callback) {
        Suppliers.find({}).sort({ name: 1 }).exec(callback);
      },
      categories: function (callback) {
        Categories.find({}).sort({ name: 1 }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      res.render('item_form', {
        title: 'Create Item',
        suppliers: results.suppliers,
        categories: results.categories,
      });
    }
  );
};

exports.itemCreatePost = [
  //Converting category into array.
  (req, res, next) => {
    if (!req.body.category instanceof Array) {
      if (typeof req.body.category === undefined) {
        req.body.category = [];
      } else {
        req.body.category = new Array(req.body.category);
      }
    }
    next();
  },

  body('name', 'Please provide name').trim().isLength({ min: 1 }).escape(),
  body('supplier', 'Please provide suplier')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('description', 'Please provide description')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('price', 'Please provide price').trim().isLength({ min: 1 }).escape(),
  body('number_in_stock', 'Please provide number in stock')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('category.*').escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    var item = new Items({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      number_in_stock: req.body.number_in_stock,
      category: req.body.category,
      supplier: req.body.supplier,
    });

    if (!errors.isEmpty()) {
      async.parallel(
        {
          suppliers: function (callback) {
            Suppliers.find({}).sort({ name: 1 }).exec(callback);
          },
          categories: function (callback) {
            Categories.find({}).sort({ name: 1 }).exec(callback);
          },
        },
        function (err, results) {
          if (err) {
            return next(err);
          }
          for (let i = 0; i < results.categories.length; i++) {
            if (item.category.indexOf(results.categories[i]._id) > -1) {
              results.categories[i].checked = 'true';
            }
          }
          res.render('item_form', {
            title: 'Create Item',
            item: item,
            suppliers: results.suppliers,
            categories: results.categories,
            errors: errors.array(),
          });
        }
      );
    } else {
      item.save(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect(item.url);
      });
    }
  },
];

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
