const JWT = require('jsonwebtoken');

const { hashPassword, comparePassword } = require("../utilities/authHelper");
const userModel = require("../models/UserSchema");
const orderModel = require("../models/orderModel");

//user registration
const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;

        //validations
        if (!name) {
            return res.send({ message: 'Name is required' });
        }
        if (!email) {
            return res.send({ message: 'Email is required' });
        }
        if (!password) {
            return res.send({ message: 'Password is required' });
        }
        if (!phone) {
            return res.send({ message: 'Phone no is required' });
        }
        if (!address) {
            return res.send({ message: 'Address is required' });
        }
        if (!answer) {
            return res.send({ message: 'Answer is required' });
        }

        //existing user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'Already Register please login'
            });
        }

        //hash password
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({
            name, email, phone, address, password: hashedPassword, answer
        }).save();

        res.status(201).send({
            success: true,
            message: 'User Registered Successfully!',
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in registration',
            error
        });
    }
};

//user login
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password'
            });
        }
        //check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered"
            });
        }

        //compare password
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(400).send({
                success: false,
                message: "Invalid Password"
            });
        }

        //create token
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        return res.status(200).send({
            success: true,
            message: "Login Successful!",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Login',
            error
        });
    }
};

//forgot password
const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        if (!email) {
            res.status(400).send({ message: "Email is required" });
        }
        if (!answer) {
            res.status(400).send({ message: "answer is required" });
        }
        if (!newPassword) {
            res.status(400).send({ message: "New Password is required" });
        }
        //check
        const user = await userModel.findOne({ email, answer });
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong Email Or Answer",
            });
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
};

//test controller
const testController = (req, res) => {
    try {
        res.send("Protected Routes");
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
};

//update user Profile
const updateProfileController = async (req, res) => {
    try {
        const { name, email, address, phone } = req.body;
        const user = await userModel.findById(req.user._id);

        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            phone: phone || user.phone,
            address: address || user.address
        }, { new: true });
        res.status(200).send({
            success: true,
            message: 'User Profile updated successfully',
            updatedUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while updating user profile",
            error: error.message,
        });
    }
};

//user orders
const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel.find({ buyer: req.user._id }).populate("products", "-photo").populate("buyer", "name");
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting Orders",
            error: error.message
        })
    }
};

//All users orders
const getAllOrdersControllers = async (req, res) => {
    try {
        const orders = await orderModel.find({}).populate("products", "-photo").populate("buyer", "name").sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting all Orders",
            error: error.message
        })
    }
};

//order status update
const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
        res.json(orders);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            message: "Error while updating Orders status",
            error: error.message
        })
    }
};

module.exports = { registerController, loginController, forgotPasswordController, testController, updateProfileController, getOrdersController, getAllOrdersControllers, orderStatusController };