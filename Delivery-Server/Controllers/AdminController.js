const admin=require('../Models/AdminSchema');
const order = require('../Models/OrderSchema');
const users = require('../Models/UserSchema');
const jwt=require('jsonwebtoken');

exports.adminRegistration=async(req,res)=>{
    const {adminname,adminEmail,adminPassword}=req.body;
    // const adminProfile=req.file?req.file.filename:"";
    try{
      const existingAdmin=await admin.findOne({adminEmail});
      if(existingAdmin){
        res.status(406).json("Admin is Already Existing...")
      }else{
        const newAdmin=new admin({
            adminname,adminEmail,adminPassword
        });
        await newAdmin.save();
        res.status(200).json(newAdmin)
      }
    }catch(err){
        console.log("Error at AdminController.js/adminRegistration catch(401)::::",err); 
    }
}

exports.adminlogin=async(req,res)=>{
    const{adminEmail,adminPassword}=req.body;
    try{
        const existingAdmin=await admin.findOne({adminEmail,adminPassword});
       if(existingAdmin){
        const adminToken=jwt.sign({adminId:existingAdmin._id},process.env.JWT_SECRETKEY);
        res.status(200).json({adminToken,existingAdmin});
       }else{
        res.status(406).json("Invalid Email  or Password::::");
       }
    }catch(err){
        console.log("Error at catch in adminController.js/adminLogin:::::::");
        
    }
}

exports.getAdminById=async(req,res)=>{
   const adminId=req.payload;
   
   try{
    const AdminDetails=await admin.findById(adminId);
    if(AdminDetails){
      res.status(200).json(AdminDetails)
    }else{
      res.status(406).json("Error at getAdminById::::")
    }
   }catch(err){
    console.log("Error at catch in adminController.js/getAdminById:::::::",err);
   }
}

// getAll orders in admin by status Pending;

exports.getAllOrdersPending=async(req,res)=>{
  try{
    const orderByPending=await order.find({status:"Pending"});
    if(orderByPending){
      res.status(200).json(orderByPending);
    }else{
      res.status(406).json("Can't find orderByPending Details");

    }
  }catch(err){
    console.log("Error at catch in adminController.js/getAllOrdersPending:::::::");
  }
}

exports.getAllOrdersPickuped=async(req,res)=>{
  // console.log("hello");
  try{
    const orderByPickuped=await order.find({status:"Pickuped"});
    if(orderByPickuped){
      res.status(200).json(orderByPickuped);
    }else{
      res.status(406).json("Can't find orderByPickuped Details");

    }
  }catch(err){
    console.log("Error at catch in adminController.js/getAllOrdersPickuped:::::::");
  }
}


exports.getAllOrdersDelivered = async (req, res) => { 
  try {
    const ordersWithPayments = await order.aggregate([
      {
        $match: { status: "Delivered" }, 
      },
      {
        $lookup: {
          from: "payments", 
          localField: "_id", 
          foreignField: "order_id", 
          as: "payments", 
        },
      },
      {
        $unwind: {
          path: "$payments", 
          preserveNullAndEmptyArrays: true, 
        },
      },
    ]);

    // If orders are found, send the response
    if (ordersWithPayments && ordersWithPayments.length > 0) {
      res.status(200).json(ordersWithPayments);
    } else {
      res.status(404).json({ message: "No delivered orders found::::" });
    }
  } catch (err) {
    console.log("Error at catch in adminController.js/getAllOrdersDelivered:::::::", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};


exports.getAllUser=async(req,res)=>{
  try{
  const allUsers=await users.find();
  if(allUsers){
    res.status(200).json(allUsers);
  } else {
    res.status(404).json({ message: "No users found." });
  }
  }catch(err){
    console.log("Error at catch in adminController.js/getAllUser:::::::", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
}


