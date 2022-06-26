#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true'
);

require('dotenv').config();

var async = require('async');
var Item = require('./models/item');
var Category = require('./models/category');
var Supplier = require('./models/supplier');

var mongoose = require('mongoose');
var mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var items = [];
var categories = [];
var suppliers = [];

function itemCreate(
  name,
  description,
  price,
  number_in_stock,
  category,
  supplier,
  cb
) {
  itemDetail = {
    name: name,
    description: description,
    price: price,
    number_in_stock: number_in_stock,
    category: category,
    supplier: supplier,
  };
  var item = new Item(itemDetail);

  item.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Item: ' + item);
    items.push(item);
    cb(null, item);
  });
}

function categoryCreate(name, description, cb) {
  categoryDetail = { name: name, description: description };
  var category = new Category(categoryDetail);

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Category' + category);
    categories.push(category);
    cb(null, category);
  });
}

function supplierCreate(name, description, cb) {
  supplierDetail = { name: name, description: description };
  var supplier = new Supplier(supplierDetail);

  supplier.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Supplier' + supplier);
    suppliers.push(supplier);
    cb(null, supplier);
  });
}

function createCategoriesSuppliers(cb) {
  async.series(
    [
      function (callback) {
        categoryCreate(
          'Beverages',
          'The beverage industry (also known as the drink industry)' +
            'manufactures drinks and ready-to-drink products.' +
            'Examples are bottled water, soft drinks, energy drinks, milk ' +
            'products, coffee and tea-based products and nutritional beverages.',
          callback
        );
      },
      function (callback) {
        categoryCreate(
          'Bakery',
          'Bakery products, which include bread, rolls, cookies, pies, ' +
            'pastries, and muffins, are usually prepared from flour or ' +
            'meal derived from some form of grain. Bread, already a common ' +
            'staple in prehistoric times, provides many nutrients in the human diet.',
          callback
        );
      },
      function (callback) {
        categoryCreate(
          'Canned Food',
          'Canning of food products is a preservation method, which includes ' +
            'sealing and sterilizing of food products in airtight containers. ' +
            'Various canned food products offered in the market include seafood, ' +
            'meat, fruits, vegetables, meals, sweets & desserts, soups & sauces, ' +
            'beans, lentils, and pastas.',
          callback
        );
      },
      function (callback) {
        categoryCreate(
          'Fruits & Vegetables',
          'Botanically, fruits and vegetables are classified depending on which ' +
            'part of the plant they come from. A fruit develops from the flower of ' +
            'a plant, while the other parts of the plant are categorized as vegetables. ' +
            'Fruits contain seeds, while vegetables can consist of roots, stems and leaves.',
          callback
        );
      },
      function (callback) {
        categoryCreate(
          'Meat & Seafood',
          'Image result for Seafood grocery description seafood, edible aquatic animals, ' +
            'excluding mammals, but including both freshwater and ocean creatures' +
            'Meat products includes all types of meat, poultry',
          callback
        );
      },
      function (callback) {
        supplierCreate(
          'Tehzeeb Bakers',
          'Tehzeeb is a culture, tradition, lifestyle, and class of twin cities in Pakistan, ' +
            "with a legacy of more than 100 years. The bakery is exceedingly popular among society's " +
            'elites including Presidents, Prime Ministers, Ambassadors even Royal Prince, Kings, Queens, ' +
            'and their families visiting Pakistan from all around the world. We believe in sharing love, ' +
            'happiness, and making this world a better place.',
          callback
        );
      },
      function (callback) {
        supplierCreate(
          "K&N's",
          "At K&N's our ethos drives us to provide products that are Purely Different, not just as a product" +
            ' range with varied flavour profiles, but also the way we produce them. ',
          callback
        );
      },
      function (callback) {
        supplierCreate(
          'Metro',
          'The company has a simple and efficient business concept, which is defined through its customer ' +
            'base: we cater to Business Customers and End Consumers. We welcome both families and business ' +
            'owners to our stores everyday and serve them with all our expertise.',
          callback
        );
      },
    ],
    //Optional.
    cb
  );
}

function createItems(cb) {
  async.parallel(
    [
      function (callback) {
        itemCreate(
          'Mango',
          'Sindhari Per 500GM',
          160,
          5,
          categories[3],
          suppliers[2],
          callback
        );
      },
      function (callback) {
        itemCreate(
          'Nuggets',
          "Scrumptious bites of flavourful golden perfection, K&N's Breaded Selection",
          600,
          12,
          categories[2],
          suppliers[1],
          callback
        );
      },
      function (callback) {
        itemCreate(
          'Butter Cream Cake',
          'SPECIAL CHOCOLATE. Every Cake has a story to tell',
          2010,
          3,
          categories[1],
          suppliers[0],
          callback
        );
      },
      function (callback) {
        itemCreate(
          'Sausages',
          "Select seasonings blended with choicest boneless chicken, K&N's Deline - " +
            'our range of premium skinless sausages and cold cuts',
          600,
          12,
          categories[2],
          suppliers[1],
          callback
        );
      },
      function (callback) {
        itemCreate(
          'Biscuits',
          'GIVING YOU A PIECE OF OUR HEART',
          1365,
          7,
          categories[1],
          suppliers[0],
          callback
        );
      },
    ],
    cb
  );
}

async.series(
  [createCategoriesSuppliers, createItems],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    } else {
      console.log('Items ' + items);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
