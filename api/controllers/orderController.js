import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Product from "../models/productsModel.js";

// @Desc Create new order
// @Route /api/orders
// @Method POST
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    user,
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
    status,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(401);
    throw new Error("No order items");
  }

  const createdOrder = await new Order({
    user: user,
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
    status,
  });

  await createdOrder.save();

  res.status(201).json({ success: true, order: createdOrder });
});

// @Desc Get order by ID
// @Route /api/orders/:id
// @Method GET
export const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    res.status(401);
    throw new Error("Order not found");
  }

  res.status(201).json({ success: true, order });
});

// @Desc Get order by ID
// @Route /api/orders/:id
// @Method GET
export const getStatusOrder = asyncHandler(async (req, res) => {
  const order = await Order.find({status : req.query.status});

  if (!order) {
    res.status(401);
    throw new Error("Order not found");
  }

  res.status(201).json({ success: true, order });
});

// @Desc Update order to paid
// @Route /api/orders/:id
// @Method PUT
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  let order = await Order.findById(req.params.id);

  if (!order) {
    res.status(401);
    throw new Error("Order not found");
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.payer.email_address,
  };

  const updatedOrder = await order.save();

  res.status(201).json({ success: true, order: updatedOrder });
});

// @Desc Update order to delivered
// @Route /api/order/:id/deliver
// @Method PUT
export const updateOrderToDeliver = asyncHandler(async (req, res) => {
  let order = await Order.findById(req.params.id);

  if (!order) {
    res.status(401);
    throw new Error("Order not found");
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updatedOrder = await order.save();

  res.status(201).json({ success: true, order: updatedOrder });
});

// @Desc Get my orders
// @Route /api/orders/myorders
// @Method GET
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(201).json({ success: true, orders });
});

// @Desc Get my orders
// @Route /api/orders/myorders
// @Method GET
export const getAllMyOrders = asyncHandler(async (req, res) => {

    const pageSize = Number(req.query.pageViewSize) || 6;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
          user: req.query.user
        }
      : {};

    const count = await Order.countDocuments({ ...keyword });
    const orders = await Order.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.status(201).json({
      success: true,
      orders,
      page,
      count,
      pages: Math.ceil(count / pageSize),
    });

});

// @Desc Get my orders
// @Route /api/orders/myorders
// @Method GET
export const getAllOrders = asyncHandler(async (req, res) => {

  const pageSize = Number(req.query.pageViewSize) || 25;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Order.countDocuments({ ...keyword });
  const orders = await Order.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.status(201).json({
    success: true,
    orders,
    page,
    count,
    pages: Math.ceil(count / pageSize),
  });

});

// @Desc Get all orders
// @Route /api/orders
// @Method GET
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.status(201).json({ success: true, orders });
});

// @Desc Get my orders
// @Route /api/orders/myorders
// @Method GET
export const getTotalSales = asyncHandler(async (req, res) => {

  // const pageSize = Number(req.query.pageViewSize) || 25;
  // const page = Number(req.query.pageNumber) || 1;

  // const keyword = req.query.keyword
  //   ? {
  //       name: {
  //         $regex: req.query.keyword,
  //         $options: "i",
  //       },
  //     }
  //   : {};

  // const count = await Order.countDocuments({ ...keyword });
  // const orders = await Order.find({ ...keyword })
  //   .limit(pageSize)
  //   .skip(pageSize * (page - 1));


    // Run a MongoDB query to group the category and provide a
        // sum of the category.
        // var categories = [];
        await Order.aggregate( [ {
          $group: {
            _id: "total price",
            num: { $sum: "$totalPrice" }
          }},
          {$sort: {_id: 1 }}]).then(function(data){
            // categories.push(...data);
            // var sum = categories.reduce(function(acc, val){
            //   return acc + val["num"]
            // }, 0);

        // Create a variable to store the value of Sum and _id
            // var allcategory = {
            //   _id: "All",
            //   num: sum
            // }
        // Push to front of categories array and callback()
            // categories.unshift(allcategory);

            res.status(201).json({
              success: true,
              data : data,
            });

})});

// @Desc Get my orders
// @Route /api/orders/myorders
// @Method GET
export const getDailyAverage = asyncHandler(async (req, res) => {

  await Order.aggregate([
        {
           $unwind:"$orderItems"
        },
        {
           $group:{
              _id:"orderItems",
              quantity:{
                $sum:"$orderItems.quantity"
              }
           }
        }
     ]).then(function(data){

      res.status(201).json({
        success: true,
        data : data,
      });
    });
});

// @Desc Get my orders
// @Route /api/orders/myorders
// @Method GET
export const getTotalOrderCount = asyncHandler(async (req, res) => {

  const pageSize = Number(req.query.pageViewSize) || 25;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Order.countDocuments({ ...keyword });
  const orders = await Order.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.status(201).json({
    success: true,
    orders,
    page,
    count,
    pages: Math.ceil(count / pageSize),
  });

});


// @Desc Get my orders
// @Route /api/orders/myorders
// @Method GET
export const getUserCount = asyncHandler(async (req, res) => {

  const count = await User.countDocuments();

    res.status(201).json({
      success: true,
      data : count,
    });

});

// @Desc Get my orders
// @Route /api/orders/myorders
// @Method GET
export const getProductCount = asyncHandler(async (req, res) => {

  const count = await Product.countDocuments();

    res.status(201).json({
      success: true,
      data : count,
    });

});

// @Desc Get my orders
// @Route /api/orders/myorders
// @Method GET
export const getTotalProductSales = asyncHandler(async (req, res) => {

  const pageSize = Number(req.query.pageViewSize) || 25;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Order.countDocuments({ ...keyword });
  const orders = await Order.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.status(201).json({
    success: true,
    orders,
    page,
    count,
    pages: Math.ceil(count / pageSize),
  });

});