let formidable = require('express-formidable');
const express = require('express');

const { createProductController, getProductController, getSingleProductController, deleteProductController, updateProductController, getPhotoController, productFiltersController, productCountController, productListController, searchProductController, relatedProductController, productCategoryController, braintreeTokenController, brainTreePaymentController } = require('../controllers/productController');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');

//router object
const router = express.Router();

//CREATE PRODUCT || METHOD POST
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

//UPDATE PRODUCT || METHOD PUT
router.put('/update-product/:id', requireSignIn, isAdmin, formidable(), updateProductController);

//GET ALL PRODUCTS || METHOD GET
router.get('/get-products', getProductController);

//GET SINGLE PRODUCT || METHOD GET
router.get('/get-product/:slug', getSingleProductController);

//DELETE PRODUCT || METHOD DELETE
router.delete('/delete-product/:id', requireSignIn, isAdmin, deleteProductController);

//GET PHOTO || METHOD GET
router.get('/product-photo/:id', getPhotoController);

//FILTER PRODUCT || METHOD POST
router.post('/product-filters', productFiltersController);

//PRODUCT COUNT || METHOD GET
router.get('/product-count', productCountController);

//PRODUCT PER PAGE || METHOD GET
router.get('/product-list/:page', productListController);

//SEARCH PRODUCT || METHOD GET
router.get('/search/:keyword', searchProductController);

//SIMILAR PRODUCT || METHOD GET
router.get('/related-product/:pid/:cid', relatedProductController);

//CATEGORY WISE PRODUCT || METHOD GET
router.get('/product-category/:slug', productCategoryController);

//payment gateway//

//USER TOKEN || METHOD GET
router.get('/braintree/token', braintreeTokenController);

//PAYMENT || METHOD POST
router.post('/braintree/payment', requireSignIn, brainTreePaymentController);

module.exports = router;