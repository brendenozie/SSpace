import mongoose from "mongoose";

const OrderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    orderItems: [
      {
        pName: { type: String, required: true },
        quantity: { type: Number, required: true },
        pImage: [{ type: String}],
        pPrice: { type: Number, required: true },
        totalItemCost: { type: Number, required: true },
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],

    shippingAddress: {
      address: { type: String, },
      city: { type: String, },
      info: { type: String,  },
      country: { type: String, },
    },

    paymentMethod: {
      type: String,
    },

    voucherId: {
      type: String,
    },

    voucherAmount: {
      type: String,
    },

    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: Date },
      email_address: { type: String },
    },

    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },

    shippingPrice: {
                    deliveryType: { type: String, },
                    deliveryFee: { type: String, },
    },

    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },

    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },

    paidAt: {
      type: Date,
    },

    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },

    deliveredAt: {
      type: Date,
    },
    status: String,
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;
