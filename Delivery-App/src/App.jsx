/* eslint-disable no-unused-vars */
import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./Pages/User/Home"
import PickUp from "./Pages/User/PickUp"
import Orders from "./Pages/User/Orders"
import Services from "./Pages/User/Services"
import AgentHome from "./Pages/Agent/AgentHome"
import AgentDelivery from "./Pages/Agent/AgentDelivery"
import AgentOdrCmplt from "./Pages/Agent/AgentOdrCmplt"
import AdminCmpltdOrd from "./Pages/Admin/AdminCmpltdOrd"
import AdminPickups from "./Pages/Admin/AdminPickups"
import AdminDeliveries from "./Pages/Admin/AdminDeliveries"
import AdminAgentDetails from "./Pages/Admin/AdminAgentDetails"
import AdminaddAgent from "./Pages/Admin/AdminaddAgent"
import AdminUserDetails from "./Pages/Admin/AdminUserDetails"
// import AdminSearchOrder from "./Pages/Admin/AdminSearchOrder"
import Auth from "./Pages/User/Auth"
import LandingScreen from "./Pages/User/LandingScreen"
import AgentSiginIn from "./Pages/Agent/AgentSiginIn"
import AddAdmin from "./Pages/Admin/AddAdmin"
import AdminSigin from "./Pages/Admin/AdminSigin";
import { useContext } from "react"
import { TokenAuthContextUser } from "./Pages/ContextApi/TokenAuth"
import { TokenAuthContextAgent } from "./Pages/ContextApi/TokenAgent"
import { TokenAuthContextAdmin } from "./Pages/ContextApi/TokenAdmin"

const App = () => {
  const { isAuthorizedUser, setIsAuthorizedUser }=useContext(TokenAuthContextUser);
  const { isAuthorizedAgent, setIsAuthorizedAgent }=useContext(TokenAuthContextAgent);
  const { isAuthorizedAdmin, setIsAuthorizedAdmin }=useContext(TokenAuthContextAdmin)

  return (
    <>
      <Routes>

        {/* <<<<<....User Routes.....>>>>> */}

        <Route path='/"' element={<Navigate to={'/'} />} />


        <Route path='/' element={<LandingScreen />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register />} />
        <Route path='/home' element={isAuthorizedUser?<Home/>:<Auth/>} />
        <Route path='/pickup' element={isAuthorizedUser?<PickUp />:<Auth/>} />
        <Route path='/orders' element={isAuthorizedUser?<Orders />:<Auth/>} />
        <Route path='/services' element={isAuthorizedUser?<Services />:<Auth/>} />

        {/* <<<<<......Agent Routes......>>>>> */}

        <Route path='/agentSigin' element={<AgentSiginIn />} />
        <Route path='/agentPickup' element={isAuthorizedAgent?<AgentHome />:<AgentSiginIn/>} />
        <Route path='/agentDelivery' element={isAuthorizedAgent?<AgentDelivery />:<AgentSiginIn/>} />
        <Route path='/completedOrders' element={isAuthorizedAgent?<AgentOdrCmplt />:<AgentSiginIn/>} />

        {/* <<<<<.....Admin Routes.....>>>>> */}

        <Route path='/adminSigin' element={<AdminSigin/>} />
        <Route path='/adminCmpltdOrd' element={isAuthorizedAdmin?<AdminCmpltdOrd />:<AdminSigin/>} />
        <Route path='/adminPickups' element={isAuthorizedAdmin?<AdminPickups />:<AdminSigin/>} />
        <Route path='/adminDeliveries' element={isAuthorizedAdmin?<AdminDeliveries />:<AdminSigin/>} />
        <Route path='/adminAgentDetails' element={isAuthorizedAdmin?<AdminAgentDetails />:<AdminSigin/>} />
        <Route path='/adminAddAgent' element={isAuthorizedAdmin?<AdminaddAgent />:<AdminSigin/>} />
        <Route path='/addAdmin' element={isAuthorizedAdmin?<AddAdmin />:<AdminSigin/>} />
        <Route path='/adminUserDetails' element={isAuthorizedAdmin?<AdminUserDetails />:<AdminSigin/>} />
        {/* <Route path='/adminSearchOrderByid' element={<AdminSearchOrder />} /> */}

      </Routes>
    </>
  )
}

export default App
