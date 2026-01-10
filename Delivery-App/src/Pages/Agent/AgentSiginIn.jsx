/* eslint-disable no-unused-vars */
import { useContext, useState } from "react"
import { AgentLogin } from "../Services/All_Api";
import { useNavigate } from "react-router-dom";
import { TokenAuthContextAgent } from "../ContextApi/TokenAgent";

const AgentSiginIn = () => {
  const { isAuthorizedAgent, setIsAuthorizedAgent }=useContext(TokenAuthContextAgent)
  const [agentData,setAgentData]=useState({
    agentEmail:"",accessCode:''
  });
  const navigate=useNavigate();


  const handleAgentLogin=async()=>{
    const {agentEmail,accessCode}=agentData;
    if(!agentEmail || !accessCode){
      alert("Please fill the Empty fields");
    }
    try{
     const loginedAgent=await AgentLogin(agentData);
     if(loginedAgent.status==200){
      setAgentData(loginedAgent.data);
      // sessionStorage.setItem("AgentName", loginedAgent.data.existingAgent.AgentName);
      sessionStorage.setItem("agentToken", loginedAgent.data.agentToken)
      setIsAuthorizedAgent(true);
      navigate('/agentPickup');
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
            square:text-2xl">Agent Login</p>
            <div className="flex flex-col
            md:p-2 md:mt-5
            square:p-2 square:mt-5">
                <label className=" text-white
                md:p-2
                square:p-2" htmlFor="">
                    Agent Email
                </label>
                <input type="text" placeholder="Email"
                onChange={e=>setAgentData({...agentData,agentEmail:e.target.value})} />
            </div>

            <div className="flex flex-col
            md:p-2
            square:p-2">
                <label className="text-white
                md:p-2
                square:p-2" htmlFor="">
                    Agent Access Code
                </label>
                <input type="text" placeholder="Access Code"
                onChange={e=>setAgentData({...agentData,accessCode:e.target.value})}/>
            </div>

            <button className="bg-slate-100 mt-4
            md:p-2 md:ps-3 md:pe-3
            square:p-2 square:ps-3 square:pe-3" onClick={handleAgentLogin}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default AgentSiginIn
