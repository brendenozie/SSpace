import mongoose from "mongoose";

const ReviewsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const ProductsSchema = new mongoose.Schema({
  pName: {
    type: String,
  },
  pBrand: {
    type: String,
  },
  pSubCat: {
    type: String,
  },
  pCategory: {
    type: String,
  },
  pPrice: {
    type: String,
  },
  pOfferPrice: {
    type: String,
  },
  pIsOnOffer: {
    type: String,
  },
  pImage: {
    type: [{publicId: String, url: String}],
  },
  pIsActive: {
    type: Boolean,
  },
  pDesc: {
    type: String,
  },
  pRating: {
    type: Number,
    min: 0,
    max: 5,
  },
  
  pReviews: [ReviewsSchema], 

  pCountInStock: {
    type: Number,
  },
  pCheapestPrice: {
    type: Number,
  },
  pFeatured: {
    type: Boolean,
  },
  pIsInStock: {
    type: Boolean,
  },
},
{
  timestamps: true,
}
);

const Product = mongoose.model("Product", ProductsSchema);

export default Product;