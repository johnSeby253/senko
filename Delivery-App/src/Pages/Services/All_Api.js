import { common_Api } from "./Common_Api"
import { Server_Url } from "./Server_Url"


// <<<<<<<........UserSide APIs........>>>>>>>> //

// User Registration //
export const userRegister=async(user)=>{
    return await common_Api("POST",`${Server_Url}/userRegister`,user,"")
}
// UserLogin
export const userLogin=async(user)=>{
  return await common_Api("POST",`${Server_Url}/userLogin`,user,"");
}
// getuserProfileData
export const getuserProfileData=async(reqHeader)=>{
  return await common_Api("GET",`${Server_Url}/getuserProfile`,"",reqHeader);
}
// edituserProfileData
export const edituserProfileData=async(reqBody,reqHeader)=>{
  return await common_Api("PUT",`${Server_Url}/editUserProfile`,reqBody,reqHeader);
}
// CreateOrder
export const createOrderByUser=async(reqbody,reqHeader)=>{
  return await common_Api("POST",`${Server_Url}/createOrder`,reqbody,reqHeader);
}
// getAgentLocation
export const getNearestHubs=async()=>{
  return await common_Api("GET",`${Server_Url}/getAgentLocation`,'','');
}
// getUserOrderList
export const getUserOrderList=async(reqHeader)=>{
  return await common_Api("GET",`${Server_Url}/getUserOrder`,'',reqHeader);
}
// getOrderById
export const getUserOrderById=async(order_id)=>{
  return await common_Api("GET",`${Server_Url}/getOrderById/${order_id}`,'','');
}
// editOrderById
export const editUserOrderById=async(order_id,reqbody,reqHeader)=>{
  return await common_Api("PUT",`${Server_Url}/editUserOrder/${order_id}`,reqbody,reqHeader);
}
// cancelOrder
export const cancelOrder=async(order_id,reqbody)=>{
  return await common_Api("PUT",`${Server_Url}/cancelOrder/${order_id}`,reqbody,'');
}


// <<<<<<<<.........AgentSide APIs.........>>>>>>>>

// AgentLogin
export const AgentLogin=async(reqbody)=>{
  return await common_Api("POST",`${Server_Url}/agentLogin`,reqbody,'');
}
// getAllAgentData
export const getAgentOrderData=async(reqHeader)=>{
  return await common_Api("GET",`${Server_Url}/getAgentOrder`,'',reqHeader);
}
// getAllAgentDataPickuped
export const getAgentOrderPickuped=async(reqHeader)=>{
  return await common_Api("GET",`${Server_Url}/getAgentOrderbyPickup`,'',reqHeader);
}
// getAllAgentDataDelivered
export const getAgentOrderDelivered=async(reqHeader)=>{
  return await common_Api("GET",`${Server_Url}/getAgentOrderDelivered`,'',reqHeader);
}
// editPendingAgentOrder
export const editPendingAgentOrder=async(orderId,reqBody,reqHeader)=>{
  return await common_Api("PUT",`${Server_Url}/editPendingOrder${orderId}`,reqBody,reqHeader)
}
// editStatus
export const editAgentStatus = async (orderId, reqbody, reqHeader) => {
  return await common_Api("PUT", `${Server_Url}/editStatus/${orderId}`, reqbody, reqHeader);
};

// getAllAgentDetails in Admin
export const AllAgentDetails=async()=>{
  return await common_Api("GET",`${Server_Url}/getAllAgentDetails`,'','');
}

// Get all Order by status Pending
export const getOrdersBypending=async()=>{
  return await common_Api("GET",`${Server_Url}/getAllOrdersByPending`,'','');
}

// Get all Order by status Pending
export const getOrdersBypickuped=async()=>{
  return await common_Api("GET",`${Server_Url}/getAllOrdersByPickuped`,'','');
}

// Add Payment
export const addNewPaymentDetails=async(order_id,reqBody)=>{
  return await common_Api("POST",`${Server_Url}/addNewPayment/${order_id}`,reqBody,'');
}

// get All orders status Delivered
export const getAllDeliveredOrderData=async()=>{
  return await common_Api("GET",`${Server_Url}/getAllOrdersByDelivered`,'','');
}

// get AdminDetails By Id
export const getAdminDetailsById=async(reqHeader)=>{
  return await common_Api("GET",`${Server_Url}/getAdminDetailsById`,"",reqHeader);
}


// get AgentDetails By Id
export const getAgentDetailsById=async(reqHeader)=>{
  return await common_Api("GET",`${Server_Url}/getAgentById`,"",reqHeader);
}

// Admin Login
export const adminLogin=async(reqbody)=>{
  return await common_Api("POST",`${Server_Url}/adminLogin`,reqbody,'');
}

// Get All users in Admin
export const getAllUsers=async()=>{
  return await common_Api("GET",`${Server_Url}/getAllUsers`,'','');
}

// Add Admin in AdminPage
export const addAdminRegister=async(reqBody)=>{
  return await common_Api("POST",`${Server_Url}/adminRegister`,reqBody,'');
}

// Add Agent in AdminPage
export const addAgentRegister=async(reqBody)=>{
  return await common_Api("POST",`${Server_Url}/agentRegister`,reqBody,'');
}