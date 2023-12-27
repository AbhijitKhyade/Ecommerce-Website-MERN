const braintree = require('braintree');
const slugify = require("slugify");
const dotenv = require('dotenv');
const fs = require("fs");

const categoryModel = require("../models/CategoryModel");
const productModel = require("../models/ProductModel");
const orderModel = require("../models/orderModel");

//env file configuration
dotenv.config();

//payment gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

//create product
const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity } = req.fields;
        const { photo } = req.files;
        //Validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "photo is Required and should be less then 1mb" });
        }

        const products = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating product",
        });
    }
};

//get all products
const getProductController = async (req, res) => {
    try {
        const products = await productModel
            .find({})
            .select("-photo")
            .populate("category")
            .limit(12)
            .sort({ createdAt: -1 });

        res.status(200).send({
            totalCount: products.length,
            success: true,
            products,
            message: "Fetched All products Successfully!",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error: error.message,
            message: "Error in fetching all product",
        });
    }
};

//get single product
const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel
            .findOne({ slug: req.params.slug })
            .select("-photo")
            .populate("category")
            .limit(12)
            .sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            product,
            message: "Fetched a single product Successfully!",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while fetching single product",
            error: error.message,
        });
    }
};

//delete product
const deleteProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findByIdAndDelete(id).select("-photo");

        res.status(200).send({
            success: true,
            product,
            message: "Successfully deleted a product",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting a product",
            error: error.message,
        });
    }
};

//update product
const updateProductController = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            quantity,
            shipping,
        } = req.fields;
        const { photo } = req.files;
        const { id } = req.params;
        //Validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "photo is Required and should be less then 1mb" });
        }

        const products = await productModel.findByIdAndUpdate(
            req.params.id,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }

        res.status(200).send({
            success: true,
            message: "Product updated Successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating product",
        });
    }
};

//get photo
const getPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id).select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while fetching photo",
            error: error.message,
        });
    }
};

//products filter
const productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while filtering product",
            error: error.message,
        });
    }
};

//products count
const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while counting product",
            error: error.message,
        });
    }
};

//product list
const productListController = async (req, res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel
            .find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while listing product",
            error: error.message,
        });
    }
};

//search product
const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const results = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ],
        }).select("-photo");
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while searching product",
            error: error.message,
        });
    }
};

//product suggestion
const relatedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await productModel.find({
            category: cid,
            _id: { $ne: pid },
        }).select('-photo').limit(3).populate('category');
        res.status(200).send({
            success: true,
            products,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while fetching related products",
            error: error.message,
        });
    }
};

//product category
const productCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        const products = await productModel.find({ category }).populate("category");

        res.status(200).send({
            success: true,
            category,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting related products",
            error: error.message,
        });
    }
};

//payment token of user
const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(response);
            }
        });
    } catch (error) {
        console.log(error);
    }
};

//payment 
const brainTreePaymentController = async (req, res) => {
    try {
        const { nonce, cart } = req.body;
        let total = 0;
        cart.map((i) => {
            total += i.price;
        });
        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            }
        },
            function (error, result) {
                if (result) {
                    const order = new orderModel({
                        products: cart,
                        payment: result,
                        buyer: req.user._id,
                    }).save();
                    // console.log(order);
                    res.json({ ok: true });
                } else {
                    res.status(500).send(error);
                }
            }
        );
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createProductController,
    getProductController,
    getSingleProductController,
    deleteProductController,
    updateProductController,
    getPhotoController,
    productFiltersController,
    productCountController,
    productListController,
    searchProductController,
    relatedProductController,
    productCategoryController,
    braintreeTokenController,
    brainTreePaymentController
};
