var async = require('async');
var { body, validationResult } = require('express-validator');
var Category = require('../models/category');
var Item = require('../models/item');

exports.categoryList = function (req, res, next) {
  // res.send('Not Implemented: Category List');
  Category.find({})
    .sort({ name: 1 })
    .exec(function (err, result) {
      if (err) {
        return next(err);
      }
      res.render('category_list', {
        title: 'Categories',
        category_list: result,
      });
    });
};

exports.categoryDetail = function (req, res, next) {
  async.parallel(
    {
      category: function (callback) {
        Category.findById(req.params.id).exec(callback);
      },
      category_items: function (callback) {
        Item.find({ category: req.params.id }).sort({ name: 1 }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.category == null) {
        var err = new Error('Category not found');
        err.status = 404;
        return next(err);
      }
      res.render('category_detail', {
        category: results.category,
        category_items: results.category_items,
      });
    }
  );
};

exports.categoryCreateGet = function (req, res, next) {
  res.render('category_form', { title: 'Create Category' });
};

exports.categoryCreatePost = [
  body('name', 'Please provide name').trim().isLength({ min: 1 }).escape(),
  body('description', 'Please provide description')
    .trim()
    .isLength({ min: 1 })
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    var category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      res.render('category_form', {
        title: 'Create Category',
        category: category,
      });
      return;
    } else {
      Category.findOne({ name: category.name }).exec(function (err, result) {
        if (err) {
          return next(err);
        }
        if (result) {
          res.redirect(result.url);
        } else {
          category.save(function (err) {
            if (err) {
              return next(err);
            }
            res.redirect(category.url);
          });
        }
      });
    }
  },
];

exports.categoryUpdateGet = function (req, res, next) {
  res.send('Not Implemented: category Update Post: ' + req.params.id);
};

exports.categoryUpdatePost = function (req, res, next) {
  res.send('Not Implemented: category Update Post: ' + req.params.id);
};

exports.categoryDeleteGet = function (req, res, next) {
  res.send('Not Implemented: category Delete Post: ' + req.params.id);
};

exports.categoryDeletePost = function (req, res, next) {
  res.send('Not Implemented: category Delete Post: ' + req.params.id);
};
