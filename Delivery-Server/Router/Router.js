const express=require('express');
const router=express.Router();
const jwtMiddleware=require('../Middlewares/jwtMiddleware');
const agentJWT=require('../Middlewares/agentJwt');
const admintJWT=require('../Middlewares/adminJwt');
const multerConfig=require('../Middlewares/multerMiddleware')
const userController=require('../Controllers/UserController');
const AdminController=require('../Controllers/AdminController');
const AgentController=require('../Controllers/AgentController');
const OrderController=require('../Controllers/OrderController');
const paymentController=require('../Controllers/PaymentController');

// <<<<<......UserRouter......>>>>>

// userRegisteration
router.post('/userRegister',userController.userRegister);
// userLogin
router.post('/userLogin',userController.userLogin);
// getUserprofileData
router.get('/getuserProfile',jwtMiddleware,userController.getuserProfile);
// EditUserProfile
router.put('/editUserProfile',jwtMiddleware,multerConfig.single('userProfile'),userController.editUserProfile);



// <<<<<<......AdminRouter......>>>>>>

// adminRegister
router.post('/adminRegister',AdminController.adminRegistration);
// adminLogin
router.post('/adminLogin',AdminController.adminlogin);
// get AdminDetails By Id
router.get('/getAdminDetailsById',admintJWT,AdminController.getAdminById);
// get all Orders By Status Pending
router.get('/getAllOrdersByPending',AdminController.getAllOrdersPending);
// get all Orders By Status Pickuped
router.get('/getAllOrdersByPickuped',AdminController.getAllOrdersPickuped);
// get all Orders By Status Delivered
router.get('/getAllOrdersByDelivered',AdminController.getAllOrdersDelivered);
// getAll Users inAdmin
router.get('/getAllUsers',AdminController.getAllUser);




// <<<<<<......AgentRouter......>>>>>>

// agentRegister
router.post('/agentRegister',AgentController.agentRegistration);
// agentLogin
router.post('/agentLogin',AgentController.agentLogin);
// getAgent details by Id
router.get('/getAgentById',agentJWT,AgentController.getAgentById);
// getAgentLocation
router.get('/getAgentLocation',AgentController.getAgentLocation);
// editPendingAgentOrder
router.put('/editPendingOrder',agentJWT,AgentController.editPendingAgentOrders);
// getAllAgentDetails
router.get('/getAllAgentDetails',AgentController.getAllAgents);
// getAgentOrderBy Pending
router.get('/getAgentOrder',agentJWT,AgentController.getAgentOrder);
// getAgentOrderPickuped
router.get('/getAgentOrderbyPickup',agentJWT,AgentController. getAgentOrderPickuped);
// getAgentOrderDelivered
router.get('/getAgentOrderDelivered',agentJWT,AgentController. getAgentOrderDeliverd);


// <<<<<.....OrderRouter......>>>>>

// createOrder
router.post('/createOrder',jwtMiddleware,OrderController.createOrder);
// getOrder
router.get('/getUserOrder',jwtMiddleware,OrderController.getUserOrders);
// editOrder
router.put('/editUserOrder/:order_id',jwtMiddleware,OrderController.editUserOrder);
// getOrderById
router.get('/getOrderById/:order_id',OrderController.getUserOrderById);
// CancelOrder
router.put('/cancelOrder/:order_id',OrderController.cancelTheOrder);
// editstatus
router.put('/editStatus/:order_id',OrderController.editStatus);



// <<<<<.....OrderRouter......>>>>>

// Adding new payment details by order_id
router.post('/addNewPayment/:order_id',paymentController.addPayment);






module.exports=router