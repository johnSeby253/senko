import { useEffect, useState } from 'react';
import prficon from '../Images/loginicon.webp';
import { Modal } from "flowbite-react";
import EditUserProfile from './EditUserProfile';
import { getuserProfileData } from '../Services/All_Api';
import { Server_Url } from '../Services/Server_Url';
import { useNavigate } from 'react-router-dom';


const UserHeader = () => {
    // State to manage visibility of the Restab
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [userProfileData, setUserProfileData] = useState({
        username: "", email: "", userProfile: ""
    });
    const navigate=useNavigate();

    // Function to toggle the menu
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const openProfileModal=()=>setOpenModal(!openModal);
     
   useEffect(()=>{
    handleProfile()
   },[])

    const handleProfile = async () => {
        try {
            const token=sessionStorage.getItem('token');
            if(token){
                const reqHeader = {
                    "Authorization": `Bearer ${token} `,
                    "Content-Type": "multipart/form-data"
                }
                const userdetails = await getuserProfileData(reqHeader);
               
                if(userdetails.status==200){
                    setUserProfileData(userdetails.data);
                }else{
                    console.log(userdetails.response.data);
                }
            }else{
                console.log("Missing Token"); 
            }
        } catch (err) {
            console.log(err);

        }
    }

    const handleLogOut=()=>{
        sessionStorage.clear();
        navigate('/login')
    }


    return (
        <>
            <div className="w-full bg-primary h-headerh flex items-center justify-evenly text-blue-50 
            square:justify-between
            watch:justify-between  ">

                <div className="brand w-1/4 h-full flex items-center justify-center text-5xl font-serif ms-7
                md:text-5xl
                sm:text-4xl
                square:text-3xl
                watch:text-2xl">
                    Delivery
                </div>
                <div className="tabs w-2/4 h-full flex items-center justify-evenly 
                square:hidden
                watch:hidden">
                    <div className="home
                    lg:text-xl">
                        <a href="/home" className="hover:border-b-2 rounded-lg pe-2 ps-2 pb-1 border-gray-300">
                            Home
                        </a>
                    </div>
                    <div className="pickUp
                    lg:text-xl">
                        <a href="/pickup" className="hover:border-b-2 rounded-lg pe-2 ps-2 pb-1 border-gray-300">
                            PickUp
                        </a>
                    </div>
                    <div className="services
                    lg:text-xl">
                        <a href="/services" className="hover:border-b-2 rounded-lg pe-2 ps-2 pb-1 border-gray-300">
                            Services
                        </a>
                    </div>
                </div>

                <div className="profile w-1/4 h-full flex items-center justify-end pr-9 
                square:hidden
                watch:hidden">
                    <div className="relative w-11 h-11 overflow-hidden rounded-full">
                        <img onClick={openProfileModal}
                            className="absolute inset-0 w-full h-full object-cover object-center"
                            src={userProfileData.userProfile?`${Server_Url}/Uploads/${userProfileData.userProfile}`:`${prficon}`}
                            alt="Profile Icon"
                        />
                    </div>
                </div>

                {/* Menu Bar */}
                <div className="meubar mr-6 
                sm:hidden" onClick={toggleMenu}>
                    <i className="fa-solid fa-bars fa-2xl " style={{ color: "#eeeff2" }}></i>
                </div>
            </div>

            {/* Restab */}
            {isMenuOpen && (
                <div className="restab w-96 h-fit bg-primary absolute right-0 border-t z-10 border-white 
                watch:w-full   ">
                    <div className="restabs flex flex-col text-blue-50 text-xl mb-7">
                        <div className="close w-full text-end p-6 cursor-pointer" onClick={toggleMenu}><i className="fa-solid fa-x fa-xl"></i></div>
                        <div className="home w-full text-center p-6 hover:bg-gray-300 hover:text-primary transition-colors duration-200">
                            <a href="/" className="hover:border-b-2 rounded-lg pe-2 ps-2 pb-1 border-gray-300">
                                Home
                            </a>
                        </div>
                        <div className="Pickup w-full text-center p-6 hover:bg-gray-300 hover:text-primary transition-colors duration-200">
                            <a href="/pickup" className="hover:border-b-2 rounded-lg pe-2 ps-2 pb-1 border-gray-300">
                                PickUp
                            </a>
                        </div>
                        <div className="services w-full text-center p-6 hover:bg-gray-300 hover:text-primary transition-colors duration-200">
                            <a href="/services" className="hover:border-b-2 rounded-lg pe-2 ps-2 pb-1 border-gray-300">
                                Services
                            </a>
                        </div>
                        <div className="account w-full text-center p-6 hover:bg-gray-300 hover:text-primary transition-colors duration-200" onClick={handleProfile}>
                            Account
                        </div>
                    </div>
                </div>
            )}

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
                                    src={userProfileData.userProfile?`${Server_Url}/Uploads/${userProfileData.userProfile}`:`${prficon}`}
                                    alt="Profile Icon"
                                />
                            </div>

                            <p className=' font-semibold text-2xl mt-2'>{userProfileData.username}</p>
                            <p className=' font-semibold text-1xl mt-2'>{userProfileData.email}</p>

                            <div className="w-[80%] h-full p-5 bg-slate-100 mt-5 rounded-2xl flex items-center justify-center">
                                <a className='font-semibold  text-lg' href="/orders">Orders</a>
                            </div>

                            <div className="w-[80%] h-full p-5 bg-slate-100 mt-5 rounded-2xl flex items-center justify-center">
                                <a className='font-semibold  text-lg' href="">Terms & Condition</a>
                            </div>

                            <div className="w-[80%] h-full p-5 bg-slate-100 mt-5 rounded-2xl flex items-center justify-center">
                                <a className='font-semibold  text-lg' href="">Settings</a>
                            </div>

                        </div>

                        {/* LogOut */}
                        <div className="w-full flex justify-end items-center ">
                            <div className="">
                                <EditUserProfile />
                            </div>
                            <button className='bg-red-800 p-2 w-[20%] text-white rounded-lg'
                            onClick={handleLogOut}>Logout</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default UserHeader;
