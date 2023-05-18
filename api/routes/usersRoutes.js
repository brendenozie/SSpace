import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  getUsersOrderCount,
} from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//   res.send("hello user, you are logged in")
// })

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//   res.send("hello user, you are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//   res.send("hello admin, you are logged in and you can delete all accounts")
// })

//UPDATE
router.put("/:id",  updateUser); //verifyUser,

//DELETE
router.delete("/:id", deleteUser);// verifyUser,

//GET
router.get("/:id",  getUser);//verifyUser,

//GET ALL
router.get("/",  getUsersOrderCount);//verifyAdmin

export default router;
