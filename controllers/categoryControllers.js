const slugify = require('slugify');

const categoryModel = require('../models/CategoryModel');

//create category
const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({ message: 'Category name is required' });
        }

        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({ message: 'Category already Exists...' });
        }
        const newCategory = await new categoryModel({
            name, slug: slugify(name)
        }).save();

        res.status(201).send({
            success: true,
            message: 'New Category created',
            newCategory
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in  category'
        })
    }
};

//update category
const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(id,
            { name, slug: slugify(name) },
            { new: true });

        res.status(200).send({
            success: true,
            message: 'Category Updated Successfully',
            category
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while updating category',
            error
        })
    }
};

//get all categories
const getCategoriesController = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: 'All Categories List',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting all categories",
            error
        })
    }
};

//get single category
const getSingleCategoriesController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            message: 'Single Category fetched',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting single category",
            error
        })
    }
};

//delete category
const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await categoryModel.findByIdAndDelete(id);

        res.status(200).send({
            success: true,
            message: 'Category deleted Successfully',
            category
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while deleting category',
            error
        })
    }
};

module.exports = { createCategoryController, updateCategoryController, getCategoriesController, deleteCategoryController, getSingleCategoriesController };