import Products from "../models/productsModel.js";

import cloudinary from '../utils/cloudinary.js';
// import Room from "../models/Room.js";

export const createProducts = async (req, res, next) => {

  
  const uploadProducts = req.body;

  try {

        const images = JSON.parse(uploadProducts.files);

        const list = await Promise.all(images.map(async (imge) => {
                        const response = await cloudinary.uploader.upload(imge.url);
                        return {publicId: response.public_id, url: response.secure_url};
                      }));

        uploadProducts.pImage = JSON.parse(uploadProducts.pImage).concat(list);

        delete uploadProducts.files;

        const newProducts = new Products(uploadProducts);

        const savedProducts = await newProducts.save();

        res.status(200).json({count : `${JSON.stringify(savedProducts)}`});

  } catch (err) {
    res.status(200).json(err);
  }

};


export const deleteProductImage = async (req, res, next) => {

  const img = req.body;

  const response = await cloudinary.uploader.destroy(img.image);

  res.status(200).json({count : response});

};

export const updateProducts = async (req, res, next) => {

  const uploadProducts = req.body;

  try {

    if(uploadProducts.files.length > 0){

        const images = JSON.parse(uploadProducts.files);

        const list = await Promise.all(images.map(async (imge) => {
                        const response = await cloudinary.uploader.upload(imge.url);
                        return {publicId: response.public_id, url: response.secure_url};
                      }));

        uploadProducts.pImage = JSON.parse(uploadProducts.pImage).concat(list);

        delete uploadProducts.files;

        const updatedProducts = await Products.findByIdAndUpdate(
          req.params.id,
          { $set: uploadProducts },
          { new: true }
        );

        res.status(200).json({count : `${JSON.stringify(updatedProducts)}`});

    }else{

      const updatedProducts = await Products.findByIdAndUpdate(req.params.id,
        { $set: uploadProducts },
        { new: true }
      );

      res.status(200).json({count : `${JSON.stringify(updatedProducts)}`});

    }

  } catch (err) {
    res.status(200).json(err);
  }
};

export const deleteProducts = async (req, res, next) => {
  try {
    await Products.findByIdAndDelete(req.params.id);
    res.status(200).json("Products has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const getProducts = await Products.find({_id : req.params.id});
    res.status(200).json({
                          success: true,
                          data:getProducts});
  } catch (err) {
    next(err);
  }
};

export const getProducts = async (req,res,next)=>{
  try {
    const products = await Products.find();
    res.status(200).json({
                            success: true,
                            data:products});
  } catch (err) {
    next(err);
  }
}
// @DESC Fetch all products
// @ROUTE /api/products
// @METHOD GET
export const getAllPaginatedProducts = async (req, res) => {
  
  const pageSize = Number(req.query.pageViewSize) || 6;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Products.countDocuments({ ...keyword });
  const products = await Products.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.status(201).json({
    success: true,
    products,
    page,
    count,
    pages: Math.ceil(count / pageSize),
  });
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Products.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const ProductsCount = await Products.countDocuments({ type: "Products" });
    const apartmentCount = await Products.countDocuments({ type: "apartment" });
    const resortCount = await Products.countDocuments({ type: "resort" });
    const villaCount = await Products.countDocuments({ type: "villa" });
    const cabinCount = await Products.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "Products", count: ProductsCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

// export const getProductsRooms = async (req, res, next) => {
//   try {
//     const Products = await Products.findById(req.params.id);
//     const list = await Promise.all(
//       Products.rooms.map((room) => {
//         return Room.findById(room);
//       })
//     );
//     res.status(200).json(list)
//   } catch (err) {
//     next(err);
//   }
// };

/**
 * @desc    Get Products Statics
 * @return  { Array<Stats> }
 */
export const getProductStats = async(req, res, next) => {
  const stats = await Products.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } }
    },
    {
      $group: {
        _id: '$category',
        'Number Of Products': { $sum: 1 },
        'Number Of Ratings': { $sum: '$ratingsQuantity' },
        'Average Rating': { $avg: '$ratingsAverage' },
        'Average Price': { $avg: '$price' },
        'Minimum Price': { $min: '$price' },
        'Maximum Price': { $max: '$price' },
        Quantity: { $sum: '$quantity' }
      }
    },
    {
      $sort: { avgPrice: 1 }
    }
  ]);

  return stats;
};
