const mongoose = require('mongoose');
const product = require('../Models/ProductModel');


const shippingAddressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required in Shipping address'],
        minLength: 1,
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        minLength: 1,
        trim: true,
        validate: {
            validator: function(value) {
                var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailRegex.test(value);
            },
            message: 'Email must be valid'
        },
        required: [true, 'Email is required in Shipping address']
    },
    address: {
        type: String,
        required: [true, 'Address line is required in Shipping address'],
        minLength: 1,
        trim: true
    },
    city: {
        type: String,
        required: [true, 'City Name is required in Shipping address'], 
        minLength: 1,
        trim: true
    },
    province: {
        type: String,
        required: [true, 'Province is required in Shipping address'], 
        default: 'Ontario'                
    },
    zip: {
        type: String,
        required: [true, 'Province Name is required in Shipping address'],
        minLength: 1,
        trim: true
    },
    country: {
        type: String,
        required: [true, 'Country is required in Shipping address'],
        default: 'Canada'
    }
  });

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    shippingAddress: {
        type: shippingAddressSchema,
        required: [true, 'Shippng address is required']
    },
    products: {
        type: [
            {product: {type: mongoose.Schema.Types.ObjectId, ref: 'product', required: [true, 'Product id is required']}, quantity: {type: Number, min: 1, required: [true, 'product quantity is required']}}
        ],
        required: [true, 'products are requird']       
    },
    totalQuantity: {
        type: Number,
        min: 1
    },
    totalPrice: {
        type: Number,
        min: 0
    },
    paymentStatus: {
        type: String,
        enum: ['Payment Successful', 'Payment Failed', 'Payment Pending', 'Refund Inititated'],
        default: 'Payment Pending',
        trim: true
    },
    orderStatus: {
        type: String,
        enum: ['In Process', 'Expired', 'Completed'],
        default: 'In Process',
        trim: true
    },
    createdAt: {
        type: String,
        default: new Date(Date.now()).toUTCString(),
        trim: true
    },
    deliveryStatus: {
        type: String,
        enum: ['Delivery In Process', 'Not Initiated', 'Delivery Completed'],
        default: 'Not Initiated',
        trim: true
    }

}, {toJSON: {virtuals: true, 
    transform: function(doc, ret) {
        delete ret._id;
        delete ret.shippingAddress._id;
        delete ret.__v;
  }}, 
  toObject: {virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;
        delete ret.shippingAddress._id;
        delete ret.__v;
   }
}}); 

// orderSchema.post('save', async function (document) { 
    
// });

const order = mongoose.model('order', orderSchema);

module.exports = order;