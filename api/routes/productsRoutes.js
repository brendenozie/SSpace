import express from "express";
import {
  countByCity,
  countByType,
  createProducts,
  deleteProducts,
  getAllPaginatedProducts,
  getProduct,
  getProducts,
  updateProducts,
  getProductStats,
  deleteProductImage
} from "../controllers/productsController.js";
import {verifyAdmin} from "../utils/verifyToken.js";
import multer from "multer";

import extractFiles from "../utils/middlayer.js";

const router = express.Router();

router.use(express.json());       
router.use(express.urlencoded({extended: true})); 

// var multer  = require('multer');
// var upload = multer() ;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, __dirname + "/uploads");
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname);
  },
  
});//storage: storage,

const Data = multer({ limits: { fieldSize: 2 * 1024 * 1024 } });

//CREATE verifyAdmin,
router.post("/", Data.any("files"), createProducts);
//delete product image
router.post("/delproduct", deleteProductImage);
//UPDATE
router.put("/:id", Data.any("files"), updateProducts);
//DELETE
router.delete("/:id", deleteProducts);
//GET
router.get("/find/:id", getProduct);
//GET ALL
router.get("/", getAllPaginatedProducts);
//filter 1
router.get("/countByCity", countByCity);
//filter 2
router.get("/countByType", countByType);
//product stats
router.get("/pstats", getProductStats);

export default router;
