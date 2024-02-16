const express = require('express');

const { createCategoryController, updateCategoryController, getCategoriesController, deleteCategoryController, getSingleCategoriesController } = require('../controllers/categoryControllers');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');

//router object
const router = express.Router();

//CREATE CATEGORY || METHOD POST
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);

//UPDATE CATEGORY || METHOD PUT
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

//GET ALL CATEGORIES || METHOD GET
router.get('/get-categories', getCategoriesController);

//GET SINGLE CATEGORY || METHOD GET
router.get('/single-category/:slug', getSingleCategoriesController);

//DELETE CATEGORY || METHOD DELETE
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);

module.exports = router;