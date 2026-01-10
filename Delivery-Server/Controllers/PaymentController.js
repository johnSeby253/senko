const payment=require('../Models/PaymentSchema');
const order = require('../Models/OrderSchema');


exports.addPayment=async(req,res)=>{
    const {paymentAmount}=req.body;
    const {order_id}=req.params;

    try{
     const newPaymentOrder=await order.findById(order_id);
     if (newPaymentOrder){
        const newPayment= new payment({
            paymentAmount,order_id
        });
      await newPayment.save();
      res.status(201).json(newPayment) 
     }else{
        res.status(406).json("Failed in Storing new Payment (can't find order_id) Data::::")
     }

    }catch(err){
        console.log("Error at catch in paymentContrller/addPayment:::::");
        res.status(401).json(err); 
    }
}
