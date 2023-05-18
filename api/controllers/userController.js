import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

export const updateUser = async (req,res,next)=>{
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}
export const deleteUser = async (req,res,next)=>{
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
}
export const getUser = async (req,res,next)=>{
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
export const getUsers = async (req,res,next)=>{
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

export const getUsersOrderCount = async (req,res,next)=>{
  try {

    // const users = await User.find();
    // res.status(200).json(users);

  //   const users = await User.aggregate([
  //     { $lookup: {
  //         from: "Order",
  //         localField: "user",
  //         foreignField: "_id",
  //         as: "orderCount"
  //     } },
  //     { $addFields: { 
  //         orderCount: { $size: "$orderCount" }
  //     } }
  // ])

  // const users = await User.aggregate([
      
  //     {
  //       "$lookup": {
  //         "from": "Order",
  //         "localField": "user",
  //         "foreignField": "_id",
  //         "as": "user_data"
  //       }
  //     },
  //     {
  //       $addFields: { 
  //                 orderCount: { $size: "$orderCount" }
  //             }
  //     }
  //   ])

  // const users = await Order.aggregate([
  //   {
  //     "$group": {
  //       "_id": "$user",
  //       "orderItems": {
  //         "$sum": 1
  //       }
  //     }
  //   },
  //   {
  //     "$lookup": {
  //       "from": "User",
  //       "localField": "user",
  //       "foreignField": "_id",
  //       "as": "user_data"
  //     }
  //   },
  //   {
  //     "$set": {
  //       "user_data": {
  //         "$arrayElemAt": [
  //           "$user_data",
  //           0
  //         ]
  //       }
  //     }
  //   }
  // ]).then(function(data){
  //   res.status(200).json(data);
  // });

//   const users = await Order.aggregate([
//     {
//           "$group": {
//             "_id": "$user",
//             "orderItems": {
//               "$sum": 1
//             }
//           }
//         },
//     { $lookup:
//         {
//            from: "User",
//            localField: "_id",
//            foreignField: "_id",
//            as: "address"
//         }
//     }
// ]);


const sedon = Order.aggregate([{
  "$group": {
        "_id": "$user",
        "orderItems": {
          "$sum": 1
        }
      }
    },
      {
        $lookup: {
          from: "users",
          let: { userIdString: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: [ "$_id", { $toObjectId: "$$userIdString" } ]
                }
              }
            }
          ],
          as: "user"
        }
      },
      {
        $addFields: {
          user: {
            $arrayElemAt: ["$user", 0]
          }
        }
      },
    ]).then(function(data){
        res.status(200).json(data);
      });




  // const users = User.aggregate([
  
  //   {
  //     "$lookup": {
  //       "from": "Order",
  //       "localField": "user",
  //       "foreignField": "_id",
  //       "as": "user_data"
  //     }
  //   },
  //   {
  //     $addFields: { 
  //                       orderCount: { $size: "$user_data" }
  //                   }
  //   }
  // ]).then(function(data){
  //   res.status(200).json(data);
  // });

    // res.status(200).json({sedon});
    
  } catch (err) {
    next(err);
  }
}


// db.Users.aggregate([
//   /** After this stage there will be only one document with one count field, till following `lookup` stage */
//   {
//     $count: "TotalUsers"
//   },
//   /** lookup on 'Posts' collection without any conditions & just count docs, After this stage there will be only one doc with two fields */
//   {
//     $lookup: {
//       from: "Posts",
//       pipeline: [ { $count: "TotalPosts" }],
//       as: "posts"
//     }
//   },
//   /** lookup on 'Chatrooms' collection without any conditions & just count docs, After this stage there will be only one doc with three fields */
//   {
//     $lookup: {
//       from: "Chatrooms",
//       pipeline: [ { $count: "TotalChatrooms" } ],
//       as: "Chatrooms"
//     }
//   },
//   /** Transform the fields as like we wanted,
//    * if a collection is empty you won't see that particular field in response, easy to handle it in code */
//   {
//     $project: {
//       TotalUsers: 1,
//       TotalChatrooms: { $arrayElemAt: [ "$Chatrooms.TotalChatrooms", 0 ] },
//       TotalPosts: { $arrayElemAt: [ "$posts.TotalPosts", 0 ] }
//     }
//   }
// ])