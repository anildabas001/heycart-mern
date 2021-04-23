const order = require('../Models/OrderModel');
const user = require('../Models/UserModel');
const product = require('../Models/ProductModel');
const CatchAsync = require('../utility/CatchAsync');
const OperationalError = require('../utility/OperationalError');

const checkProductStock = async (products) => {
    const productsOutput = []
    const outOfStockproducts = products.filter(productInfo => {
        if(productInfo.product.stockQuantity < 1 || productInfo.product.stockQuantity < productInfo.quantity) {
            productsOutput.push(productInfo.product.name)
            return true;           
        }
    });

    return productsOutput;
}

const attachTimeout = (orderId) => {
    setTimeout(async() => {
        const orderObj = await order.findOne({_id: orderId});
        const products = orderObj.products;
        if (orderObj.paymentStatus === 'Payment Not Done' || orderObj.paymentStatus === 'Payment Failed') {
            orderObj.orderStatus = 'Expired';
            for (i = 0; i< products.length; i++) {
                const productEntity = await product.findOne(
                    { "_id": products[i].product}           
                );
                productEntity.stockQuantity = productEntity.stockQuantity + products[i].quantity;
                await productEntity.save();
            }
            await orderObj.save();
        }        
    }, 300000);  
}

const updateProductQuantity = async (products) => {
    for (i = 0; i< products.length; i++) {
        const productEntity = await product.findOne(
            { "_id": products[i].product.id}           
        );
        productEntity.stockQuantity = productEntity.stockQuantity - products[i].quantity;
        await productEntity.save();
    }
}

module.exports.createOrder = CatchAsync(async (req, res, next) => {
    const shippingAddress = req.body.shippingAddress;
    const cartUser = await user.findOne({_id: req.user.id}, {cart: 1}).populate({path: 'cart.products.product', select: 'name images brand price stockQuantity quantity, id'}); 
    const cart = cartUser.cart;
    const outOfStockproducts = await checkProductStock(cart.products);
    if (outOfStockproducts.length > 0) {
        return res.json({
            status: 'fail',
            message: `Following products are either out of stock or less in quantity, please either remove or reduce the quantity of these items: \n ${outOfStockproducts.join(' ')}`
        });
    }
    else {
        await updateProductQuantity(cart.products)
    }

    const createdOrder = await order.create({
        shippingAddress,
        products: cart.products,
        totalQuantity: cart.totalQuantity,
        totalPrice: cart.totalPrice,
        user: req.user.id
    });

    const newOrder = await order.findOne({_id: createdOrder.id}, {user: 0}).populate({path: 'products.product', select: 'name images brand price stockQuantity quantity, id'}); 

    newOrder ? attachTimeout(newOrder.id): null;

    return res.status(200).json({
        status: 'success',
        data: newOrder
    });
});

module.exports.updateOrder = CatchAsync(async(req, res, next) => {
    const orderId = req.params.orderId;
    const updateObj = req.body;

    const updatedOrder = await order.findOneAndUpdate({_id: orderId}, {...updateObj}, {new: true}).populate({path: 'products.product', select: 'name images brand price stockQuantity quantity, id'});

   // const newOrder = await order.findOne({_id: orderId}, {user: 0}).populate({path: 'products.product', select: 'name images brand price stockQuantity quantity, id'}); 
    //console.log(updatedOrder);
    return res.status(200).json({
        status: 'success',
        data: updatedOrder
    });
});

module.exports.getOrder = CatchAsync(async(req, res, next) => {    
    const orderId = req.params.orderId;
    const orderCurrent = await order.findOne({_id: orderId}, {user: 0}).populate({path: 'products.product', select: 'name images brand price stockQuantity quantity, id'}); 
    if (orderCurrent && (orderCurrent.orderStatus.toLowerCase() !== 'expired' || orderCurrent.paymentStatus === 'Payment Successfull' || orderCurrent.paymentStatus === 'Payment Failed')) {
        return res.status(200).json({
            status: 'success',
            data: orderCurrent
        });
    }
    else {
        next(new OperationalError('OrderExpired', 400, 'fail', 'Order Expired. Please place new order.'))
    }
    
});

module.exports.getOrderStatus = CatchAsync(async(req, res, next) => {
    const orderId = req.params.orderId;

    const orderCurrent = await order.findOne({_id: orderId});

    res.json({
        status: 'success',
        data: orderCurrent.orderStatus
    });
});

module.exports.updatePaymentStatus = CatchAsync(async(req, res, next) => {
    const orderId = req.params.orderId;
    const paymentStatus = req.body.paymentStatus;
    const orderEntity = await order.findOne({_id: orderId});

    if (paymentStatus === 'COMPLETED') {
        orderEntity.paymentStatus = 'Payment Successful';
        orderEntity.orderStatus = 'In Process';
        orderEntity.deliveryStatus = 'Delivery In Process';
    }
    else {
        orderEntity.paymentStatus = 'Payment Failed';
        orderEntity.orderStatus = 'Expired';
        orderEntity.deliveryStatus = 'Not Initiated';
    }
    const updatedOrder = await orderEntity.save();
    res.json({
        status: 'success',
        data: {
            paymentStatus: updatedOrder.paymentStatus,
            orderStatus: updatedOrder.orderStatus,
            deliveryStatus: updatedOrder.deliveryStatus
        }
    });
});

module.exports.getOrders = CatchAsync(async(req, res, next) => {
    const orders = await order.find({paymentStatus: {$in:['Payment Successful', 'Payment Failed']}});
    res.json({
        status: 'success',
        data: orders
    })
});