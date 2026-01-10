/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../Services/All_Api";
import { TokenAuthContextAdmin } from "../ContextApi/TokenAdmin";

const AdminSigin = () => {
  const { isAuthorizedAdmin, setIsAuthorizedAdmin }=useContext(TokenAuthContextAdmin)
    const [adminData,setAdmintData]=useState({
        adminEmail:"",adminPassword:''
      });
      const navigate=useNavigate();
    
    
      const handleAdminLogin=async()=>{
        const {adminEmail,adminPassword}=adminData;
        if(!adminEmail || !adminPassword){
          alert("Please fill the Empty fields");
        }
        try{
         const loginedAdmin=await adminLogin(adminData);
         if(loginedAdmin.status==200){
            setAdmintData(loginedAdmin.data);
          // sessionStorage.setItem("AgentName", loginedAgent.data.existingAgent.AgentName);
          sessionStorage.setItem("adminToken", loginedAdmin.data.adminToken);
          navigate('/adminPickups');
          setIsAuthorizedAdmin(true);
         }
        }catch(err){
          console.log(err);
          
        }
      }
  return (
    <div>
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[50%] h-[80%] flex flex-col items-center justify-center bg-primary rounded-lg
      lg:w-[50%]
      md:w-[90%]
      square:w-[90%]">
          <p className="text-white font-semibold
          md:text-3xl
          square:text-2xl">Admin Login</p>
          <div className="flex flex-col
          md:p-2 md:mt-5
          square:p-2 square:mt-5">
              <label className=" text-white
              md:p-2
              square:p-2" htmlFor="">
                  Admin Email
              </label>
              <input type="text" placeholder="Email"
              onChange={e=>setAdmintData({...adminData,adminEmail:e.target.value})} />
          </div>

          <div className="flex flex-col
          md:p-2
          square:p-2">
              <label className="text-white
              md:p-2
              square:p-2" htmlFor="">
                 Admin Password
              </label>
              <input type="text" placeholder="Access Code"
              onChange={e=>setAdmintData({...adminData,adminPassword:e.target.value})}/>
          </div>

          <button className="bg-slate-100 mt-4
          md:p-2 md:ps-3 md:pe-3
          square:p-2 square:ps-3 square:pe-3" onClick={handleAdminLogin}>Login</button>
      </div>
    </div>
  </div>
  )
}

export default AdminSigin
