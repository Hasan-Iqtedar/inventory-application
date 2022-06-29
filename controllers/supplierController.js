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
  async.parallel(
    {
      supplier: function (callback) {
        Supplier.findById(req.params.id).exec(callback);
      },
      supplier_items: function (callback) {
        Item.find({ supplier: req.params.id }).sort({ name: 1 }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.supplier == null) {
        var err = new Error('Supplier not found');
        err.status = 404;
        return next(err);
      }
      res.render('supplier_detail', {
        supplier: results.supplier,
        supplier_items: results.supplier_items,
      });
    }
  );
};

exports.supplierCreateGet = function (req, res, next) {
  res.render('supplier_form', { title: 'Create Supplier' });
};

exports.supplierCreatePost = [
  body('name', 'Please provide name').trim().isLength({ min: 1 }).escape(),
  body('description', 'Please provide description')
    .trim()
    .isLength({ min: 1 })
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    var supplier = new Supplier({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      res.render('supplier_form', {
        title: 'Create Supplier',
        supplier: supplier,
        errors: errors.array(),
      });
      return;
    } else {
      Supplier.findOne({ name: supplier.name }).exec(function (err, result) {
        if (err) {
          return next(err);
        }
        if (result) {
          res.redirect(result.url);
        } else {
          supplier.save(function (err) {
            if (err) {
              return next(err);
            }
            res.redirect(supplier.url);
          });
        }
      });
    }
  },
];

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
