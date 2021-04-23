const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const OperationalError = require('../utility/OperationalError');
const product = require('./ProductModel');

var cartProductSchema = mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'product id is requird'],
            ref: 'product'
        },
        quantity: {
            type: Number,
            required: [true, 'quantity of the product is required'],
            min: 1
        }
    }, {toJSON: {virtuals: true, 
        transform: function(doc, ret) {
            delete ret._id;
      }}, 
      toObject: {virtuals: true,
        transform: function(doc, ret) {
            delete ret._id;
       }
    }});

const userSchema = new mongoose.Schema({
   name: {
        type: String,
        required: [true, 'User must have a name'],
        minLength: 1,
        trim: true
   },
   email: {
       type: String,
       required: [true, 'User must have an email'],
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
       unique: true
   },
   password: {
       type: String,
       required: [true, 'User must have password'],
       min: [6, 'length of password must be at least 6 character long' ],
       trim: true,
       select: false
   },
   role:{
        type: String,
        default: 'Customer',
        enum: ['Administrator', 'Customer'],
        select: false
    },
   confirmPassword: {
        type: String,
        required: [true, 'Confirm Password field must not be left empty'],
        validate: {
            validator: function(value) {
                return this.password === value;
            },
            message: 'Confirm Password field must be matching with the password field'
        },
        trim: true,
        select: false
   },
   active: {
       type: Boolean,
       default: true,
       select: false
   },
   createdAt: {
        type: String,
        default: new Date(Date.now()).toUTCString(),
        select: false
   },
   modifiedAt: {
        type: String,
        select: false
   },
   passwordReset: {
        token: String,
        expiresAt: String, 
        select: false
   },
   cart: {
    products:[cartProductSchema],    
    totalPrice: {
        type: Number,
        default: 0
    },
    totalQuantity: {
        type: Number,
        default: 0
    }
   }
},{toJSON: {virtuals: true, 
    transform: function(doc, ret) {
        delete ret.id;
        delete ret._id;
        delete ret.__v;
  }}, 
  toObject: {virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;
        delete ret.id;
        delete ret.__v;
   }
}});

userSchema.methods.verifyPassword = function(userPassword) {
    return bcrypt.compare(userPassword, this.password);
};

userSchema.pre('findOneAndUpdate', async function (next) {
    if(this._update.password) {
        this._update.password = await bcrypt.hash(this._update.password, Number(process.env['SALT_ROUNDS']));  
    }      
    next();
});

userSchema.pre('save', async function(next) {
    const targetUser = await user.findOne({email: this.email});
    if(targetUser) {
        var error = new OperationalError('email exists', 400, 'fail', 'Email already exists');
        return next(error);
    }
    
    if(!this.isModified('password')) { 
        return next();
    }

    this.confirmPassword = undefined;
    if(this.password) {
        this.password = await bcrypt.hash(this.password, Number(process.env['SALT_ROUNDS']));
    }
    
    next();
});

userSchema.pre('save', async function(next) {
    if(this.isModified('cart')) {
        this.cart.totalQuantity = 0;
        this.cart.totalPrice = 0;
        const extra = await this.cart.products;
        for(i = 0; i < this.cart.products.length; i++) {            
            const productData = await product.findOne({_id: this.cart.products[i].product},{price: 1, stockQuantity: 1});

            //  if(this.cart.products[i].quantity > productData.stockQuantity) {
            //     var error = new OperationalError('quantity exceeded', 400, 'fail', 'Quantity exceeded for the product');
            //     return next(error);
            //  }    

            this.cart.totalQuantity = this.cart.totalQuantity + Number(this.cart.products[i].quantity); 
            this.cart.totalPrice = this.cart.totalPrice + (this.cart.products[i].quantity * productData.price.value); 
        };
    }   
    next();
})


userSchema.methods.generateResetToken = function() {
    const tokenString  = crypto.randomBytes(20).toString('hex');
    const token = crypto.createHash('sha256').update(tokenString).digest('hex');
    this.passwordReset['token'] = token;
    this.passwordReset['expiresAt'] = new Date(Date.now() + Number(process.env['RESET_TOKEN_EXPIRY'])).toUTCString();
    
    return token;
}

const user = mongoose.model('user', userSchema);

module.exports = user;