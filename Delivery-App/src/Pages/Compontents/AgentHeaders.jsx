import { useEffect, useState } from "react";
import prficon from '../Images/loginicon.webp';
import { Modal } from "flowbite-react";
import { getAgentDetailsById } from "../Services/All_Api";



const AgentHeaders = () => {
    const[menubar,setMenubar]=useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [agentData, setAgentData] = useState({
        agentname: "", agentEmail: "",agentLocation:""
    });

    const handleProfile = async () => {
        setOpenModal(!openModal)
        try {
            const token = sessionStorage.getItem('agentToken')
            if (token) {
                const reqHeader = {
                    "Authorization": `Bearer ${token} `,
                    "Content-Type": "multipart/form-data"
                }
                const agentDetails = await getAgentDetailsById(reqHeader);
                console.log("data",agentData);
                
                if (agentDetails.status == 200) {
                    setAgentData(agentDetails.data);
                } else {
                    console.log(agentDetails.response.data);
                }
            } else {
                console.log("Missing Token");
            }
        } catch (err) {
            console.log(err);

        }
    }

    useEffect(() => {
        handleProfile();
        setOpenModal(false)
    },[])


    const handleMenubar=()=>setMenubar(!menubar);
    return (
        <div>

            <div className="w-full h-[60px] bg-primary flex items-center justify-between p-8 ps-10 
            watch:p-2 watch:h-[40px]
           ">
                <div className=" flex items-center">
                <div className="" onClick={handleMenubar}>
                    <i className="fa-solid fa-bars fa-xl" style={{ color: "#eaeaec" }}></i>
                </div>
                <div className="ps-10
                watch:ps-2">
                    <p className="text-white font-semibold text-3xl
                    watch:text-sm">Delivery</p>
                </div>
                </div>
                <div className="prf hidden
                sm:block">
                <div className="relative w-11 h-11 overflow-hidden rounded-full">
                        <img
                         onClick={handleProfile}
                            className="absolute inset-0 w-full h-full object-cover object-center"
                            src={prficon}
                            alt="Profile Icon"
                        />
                    </div>
                </div>
            </div>

           { menubar &&
            <div className="w-[90%] h-full bg-primary text-white border-t-2 pt-4 pb-4 absolute
            watch:w-[50%]
            sm:w-[60%]
            md:w-[50%]
            lg:w-[40%]
            xl:w-[30%]
            2xl:w-[20%]">
                <div className="w-full text-center p-4 hover:bg-slate-200 hover:text-primary
                watch:p-2">
                    <a className=" text-xl font-medium
                    watch:text-xs" href="/agentPickup">Pickup Orders</a>
                </div>
                <div className="w-full text-center p-4 hover:bg-slate-200 hover:text-primary
                 watch:p-2">
                    <a className="text-xl font-medium
                    watch:text-xs" href="/agentDelivery">Delivery Orders</a>
                </div>
                <div className="w-full text-center p-4 hover:bg-slate-200 hover:text-primary
                 watch:p-2">
                    <a className="text-xl font-medium
                    watch:text-xs " href="/completedOrders">Orders Completed</a>
                </div>

                <div onClick={handleProfile}  className="w-full text-xl font-medium text-center p-4 hover:bg-slate-200 hover:text-primary
                sm:hidden
                watch:text-xs">
                     Account
                </div>
            </div>}


     {/* profile Modal */}
     <Modal show={openModal} size="xl" popup onClose={() => setOpenModal(false)}>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Profile</h3>
                        <div className="flex items-center justify-center flex-col">

                            <div className="relative w-[100px] h-[100px] overflow-hidden rounded-full">
                                <img
                                    className="absolute inset-0 w-full h-full object-cover object-center"
                                    src={prficon}
                                    alt="Profile Icon"
                                />
                            </div>

                            <p className=' font-semibold text-2xl mt-2'>{agentData.agentname}</p>
                            <p className=' font-semibold text-1xl mt-2'>{agentData.agentEmail}</p>

                            <div 
                            className="w-[80%] h-full p-5 bg-slate-100 mt-5 rounded-2xl flex items-center justify-center font-semibold text-lg">
                               {agentData.agentLocation}
                            </div>

                            <div 
                            className="w-[80%] h-full p-5 bg-slate-100 mt-5 rounded-2xl flex items-center justify-center font-semibold text-lg">
                                <a className='font-semibold  text-lg' href="">Settings</a>
                            </div>

                        </div>

                          {/* LogOut */}
                        <div className="w-full flex justify-end items-center ">
                           
                            {/* <div className="">
                                 <EditAgentProfile/>
                                 </div>    */}
                               
                            <button className='bg-red-800 p-2 w-[20%] text-white rounded-lg
                           lw:w-[40%]'>Logout</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </div>

        
    )
}

export default AgentHeaders
