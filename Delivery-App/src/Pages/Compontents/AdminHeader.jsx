import { useEffect, useState } from "react";
import prficon from '../Images/loginicon.webp';
import { Modal } from "flowbite-react";
import { getAdminDetailsById } from "../Services/All_Api";

const AdminHeader = () => {
    const [menubar, setMenubar] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [adminData, setAdminData] = useState({
        adminname: "", adminEmail: "",
    });

    const handleProfile = async () => {
        setOpenModal(!openModal)
        try {
            const token = sessionStorage.getItem('adminToken')
            if (token) {
                const reqHeader = {
                    "Authorization": `Bearer ${token} `,
                    "Content-Type": "multipart/form-data"
                }
                const adminDetails = await getAdminDetailsById(reqHeader);
                if (adminDetails.status == 200) {
                    setAdminData(adminDetails.data);
                } else {
                    console.log(adminDetails.response.data);
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

    const handleMenubar = () => setMenubar(!menubar);
    return (
        <div >

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
                 watch:text-sm">Admin Delivery</p>
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

            {menubar &&
                <div className="w-[90%] h-full bg-primary text-white border-t-2 pt-4 pb-4 absolute z-10
                 watch:w-[50%]
                 sm:w-[60%]
                 md:w-[30%]
                 lg:w-[40%]
                 xl:w-[20%]
                2xl:w-[20%]">

                    <div className="w-full text-center p-4 hover:bg-slate-200 hover:text-primary
              watch:p-2">
                        <a className=" text-xl font-medium
              watch:text-xs" href="/adminPickups">Pickups</a>
                    </div>

                    <div className="w-full text-center p-4 hover:bg-slate-200 hover:text-primary
              watch:p-2">
                        <a className="text-xl font-medium
             watch:text-xs" href="/adminDeliveries">Deliveries</a>
                    </div>

                    <div className="w-full text-center p-4 hover:bg-slate-200 hover:text-primary
           watch:p-2">
                        <a className="text-xl font-medium
            watch:text-xs " href="/adminCmpltdOrd"> Completed Orders</a>
                    </div>

                    <div className="w-full text-center p-4 hover:bg-slate-200 hover:text-primary
           watch:p-2">
                        <a className="text-xl font-medium
            watch:text-xs " href="/adminAgentDetails"> Agent Details</a>
                    </div>

                    <div className="w-full text-center p-4 hover:bg-slate-200 hover:text-primary
           watch:p-2">
                        <a className="text-xl font-medium
            watch:text-xs " href="/adminAddAgent">Add Agent</a>
                    </div>

                    <div className="w-full text-center p-4 hover:bg-slate-200 hover:text-primary
           watch:p-2">
                        <a className="text-xl font-medium
            watch:text-xs " href="/adminUserDetails"> Login User Details</a>
                    </div>

                    {/* <div className="w-full text-center p-4 hover:bg-slate-200 hover:text-primary
           watch:p-2">
                        <a className="text-xl font-medium
            watch:text-xs " href="/adminSearchOrderByid">Search Orders</a>
                    </div> */}

                    <div className="w-full text-center p-4 hover:bg-slate-200 hover:text-primary
           watch:p-2">
                        <a className="text-xl font-medium
            watch:text-xs " href="/addAdmin">Add Admin</a>
                    </div>

                    <div onClick={handleProfile} className="w-full text-xl font-medium text-center p-4 hover:bg-slate-200 hover:text-primary
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

                            <p className=' font-semibold text-2xl mt-2'>{adminData.adminname}</p>
                            <p className=' font-semibold text-1xl mt-2'>{adminData.adminEmail}</p>

                            <div className="w-[80%] h-full p-5 bg-slate-100 mt-5 rounded-2xl flex items-center justify-center">
                                <a className='font-semibold  text-lg' href="">Settings</a>
                            </div>

                        </div>

                        {/* LogOut */}
                        <div className="w-full flex justify-end items-center ">

                            <button className='bg-red-800 p-2 w-[20%] text-white rounded-lg
                            lw:w-[40%]'>Logout</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </div>

    )
}

export default AdminHeader
