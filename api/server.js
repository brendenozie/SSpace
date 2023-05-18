import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import bodyParser from 'body-parser';
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

import authRoute from "./routes/authRoutes.js";
import usersRoute from "./routes/usersRoutes.js";
import productsRoute from "./routes/productsRoutes.js";
import ordersRoute from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
// import extractFiles from "./utils/uploadFl.js";
// import mpesaRoutes from "./routes/mpesaRoutes.js";
// hello

// var urlencodedparser = bodyparser.urlencoded({extended:false});

const app = express();

dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());       
app.use(express.urlencoded({extended: true})); 
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
// app.use(bodyParser.json());
 
// app.use(express.json());

// app.use(extractFiles);

if (process.env.NODE_ENV === "developement") {
  app.use(morgan("dev"));
}

// Product Route
app.use("/api/products", productsRoute);

// User Route
app.use("/api/users", usersRoute);

// Order Route
app.use("/api/orders", ordersRoute);

// Upload Route
app.use("/api/upload", uploadRoutes);

//Authentication Route
app.use("/api/auth", authRoute);

//Authentication Route
// app.use("/api/lpmpe", mpesaRoutes);


// app.get("/api/config/paypal", (req, res) => {
//   res.status(201).send(process.env.PAYPAL_CLIENT_ID);
// });

// const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/backend/build")));
//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "backend", "build", "index.html"))
//   );
// } else {
//   // Default Route
  app.get("/api", (req, res) => {
    res.status(201).json({ success: true, message: "Welcome Savannah Space Shop APP" });
  });
// }

// Error Handling Middleware
app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
  // connect();
  console.log(`Server is running on Port ${PORT}`)
});

