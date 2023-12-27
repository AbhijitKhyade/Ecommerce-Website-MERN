const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: [
        {
            type: mongoose.ObjectId,
            ref: "Product",
        },
    ],
    payment: {},
    buyer: {
        type: mongoose.ObjectId,
        ref: 'users',
    },
    status: {
        type: String,
        default: 'Not Process',
        enum: ["Not Process", "Processing", "Shipped", "Delivered", "Cancel"],
    },

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);