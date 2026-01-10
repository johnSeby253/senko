import { useState } from "react"
import AdminHeader from "../Compontents/AdminHeader"
import { addAgentRegister } from "../Services/All_Api";

const AdminaddAgent = () => {
  const [addAgent,setAddAgent]=useState({
    agentname:"",agentEmail:"",accessCode:"",agentLocation:"",
  });

  const handlAddnewAgent=async()=>{
    const {agentname,agentEmail,accessCode,agentLocation}=addAgent;
    if(!agentname||!agentEmail||!accessCode ||!agentLocation){
      alert("Please fill the Empty Fields")
    }else{
      try{
        const registeredAgent=await addAgentRegister(addAgent);
        if(registeredAgent.status == 200){
          alert(`${registeredAgent.data.agentname} Registerd SuccessFully`)
          // setAdminDetails({adminname:"",adminEmail:"",adminPassword:''})
        }else{
          console.log(registeredAgent.response.data);
        }
      }catch(err){
      console.log("Catch Error in AdminAddAgent.js/handlAddnewAgent::::::",err);
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
          Add Agent </h2>
      <div className="w-[90%] h-full bg-slate-100 flex flex-col items-center justify-center p-5 mt-3
      lg:mt-10
      square:w-full square:p-2
      watch:mt-5 watch:p-2 watch:w-full ">
      
     <div className="lg:w-[50%] grid gap-5 grid-cols-2 mt-5
     sm:w-full
     square:w-full square:grid-cols-1
     watch:w-full watch:grid-cols-1">

      <div className="flex flex-col gap-2 ">
      <label htmlFor="">Agencie Name</label>
      <input type="text" placeholder="Agencie Name" 
      onChange={e=>setAddAgent({...addAgent,agentname:e.target.value})}/>
      </div>

      <div className="flex flex-col gap-2">
      <label htmlFor="">Agencie Email</label>
      <input type="text" placeholder="Agencie Email"
      onChange={e=>setAddAgent({...addAgent,agentEmail:e.target.value})} />
      </div>


      <div className="flex flex-col gap-2">
      <label htmlFor="">Agencie Location</label>
      <input type="text" placeholder="Agencie Location"
      onChange={e=>setAddAgent({...addAgent,agentLocation:e.target.value})} />
      </div>
        
      <div className="flex flex-col gap-2">
      <label htmlFor="">Acces Code</label>
      <input type="text" placeholder="Acces Code" 
      onChange={e=>setAddAgent({...addAgent,accessCode:e.target.value})} />
      </div>
        
        
     </div>
     <div className="mt-10">
        <button className="bg-primary text-white p-3"
        onClick={handlAddnewAgent}>Add Agent</button>
     </div>

      </div>
    </div>

    </div>
  )
}

export default AdminaddAgent
