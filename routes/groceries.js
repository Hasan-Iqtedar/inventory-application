var express = require('express');
var router = express.Router();

var itemControler = require('../controllers/itemController');
var categoryController = require('../controllers/categoryController');
var supplierController = require('../controllers/supplierController');

/** Item Routes **/
router.get('/', itemControler.index);

router.get('/item/create', itemControler.itemCreateGet);
router.post('/item/create', itemControler.itemCreatePost);

router.get('/item/:id/update', itemControler.itemUpdateGet);
router.post('/item/:id/update', itemControler.itemUpdatePost);

router.get('/item/:id/delete', itemControler.itemDeleteGet);
router.post('/item/:id/delete', itemControler.itemDeletePost);

router.get('/item/:id', itemControler.itemDetail);
router.get('/items', itemControler.itemList);

/** Category Routes **/
router.get('/category/create', categoryController.categoryCreateGet);
router.post('/category/create', categoryController.categoryCreatePost);

router.get('/category/:id/update', categoryController.categoryUpdateGet);
router.post('/category/:id/update', categoryController.categoryUpdatePost);

router.get('/category/:id/delete', categoryController.categoryDeleteGet);
router.post('/category/:id/delete', categoryController.categoryDeletePost);

router.get('/category/:id', categoryController.categoryDetail);
router.get('/categories', categoryController.categoryList);

/** Supplier Routes **/
router.get('/supplier/create', supplierController.supplierCreateGet);
router.post('/supplier/create', supplierController.supplierCreatePost);

router.get('/supplier/:id/update', supplierController.supplierUpdateGet);
router.post('/supplier/:id/update', supplierController.supplierUpdatePost);

router.get('/supplier/:id/delete', supplierController.supplierDeleteGet);
router.post('/supplier/:id/delete', supplierController.supplierDeletePost);

router.get('/supplier/:id', supplierController.supplierDetail);
router.get('/suppliers', supplierController.supplierList);

module.exports = router;
