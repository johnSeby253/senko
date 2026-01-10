import { useState } from "react"
import AdminHeader from "../Compontents/AdminHeader"
import { addAdminRegister } from "../Services/All_Api";

const AddAdmin = () => {
  const [adminDetails,setAdminDetails]=useState({
    adminname:"",adminEmail:"",adminPassword:""
  });
   
  const handleAdminRegisration=async()=>{
    const {adminname,adminEmail,adminPassword}=adminDetails;
    if(!adminname||!adminEmail||!adminPassword){
      alert("Please fill the Empty Fields")
    }else{
      try{
        const registeredAdmin=await addAdminRegister(adminDetails);
        if(registeredAdmin.status == 200){
          alert(`${registeredAdmin.data.adminname} Registerd SuccessFully`)
          // setAdminDetails({adminname:"",adminEmail:"",adminPassword:''})
        }else{
          console.log(registeredAdmin.response.data);
        }
      }catch(err){
      console.log("Catch Error in AddAdmin.js/handleRegister::::::",err);
      }
    }
  }
  return (
    <div>
    <div className="">
      <AdminHeader/>
    </div>

    <div className="w-full h-full flex justify-center flex-col items-center ">
    <h2 className="mt-10 font-bold text-4xl text-primary
    square:text-2xl square:mt-5
    watch:text-lg watch:mt-3">
        Add Admin </h2>
    <div className="w-[90%] h-full bg-slate-100 flex flex-col items-center justify-center p-5 mt-3
    lg:mt-10
    square:w-full square:p-2
    watch:mt-5 watch:p-2 watch:w-full ">
    
   <div className="lg:w-[50%] grid gap-5 grid-cols-2 mt-5
   sm:w-full
   square:w-full square:grid-cols-1
   watch:w-full watch:grid-cols-1">

    <div className="flex flex-col gap-2 ">
    <label htmlFor="">Admin Name</label>
    <input type="text" placeholder="Admin Name"
      onChange={e=>setAdminDetails({...adminDetails,adminname:e.target.value})} />
    </div>

    <div className="flex flex-col gap-2">
    <label htmlFor="">Admin Email</label>
    <input type="text" placeholder="Admin Email"
      onChange={e=>setAdminDetails({...adminDetails,adminEmail:e.target.value})} />
    </div>
      
    <div className="flex flex-col gap-2">
    <label htmlFor="">Password</label>
    <input type="text" placeholder="Password"
     onChange={e=>setAdminDetails({...adminDetails,adminPassword:e.target.value})} />
    </div>

    {/* <div className="flex flex-col gap-2">
    <label htmlFor=""> ProfileImage</label>
    <input type="file" />
    </div> */}
      
      
   </div>
   <div className="mt-10">
      <button className="bg-primary text-white p-3"
      onClick={handleAdminRegisration}>Add Agent</button>
   </div>

    </div>
  </div>

  </div>
  )
}

export default AddAdmin
