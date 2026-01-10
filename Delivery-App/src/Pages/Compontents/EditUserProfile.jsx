import { Button, Label, Modal, TextInput } from "flowbite-react";
import prficon from '../Images/loginicon.webp';
import {  useEffect, useState } from "react";
import { edituserProfileData, getuserProfileData } from "../Services/All_Api";
import { Server_Url } from "../Services/Server_Url";

const EditUserProfile = () => {
    const [openModal, setOpenModal] = useState(false);
    const[editUserData,setEditUserData]=useState({
      userProfile:"",username:"",email:""
    });
    const [preview, setpreview] = useState("");


    useEffect(()=>{
        getuserData()
    },[])

    const handleEditUser = () => {
        setOpenModal(!openModal);
    }

    const getuserData=async()=>{
        try{
         const token=sessionStorage.getItem('token');
         if(token){
            const reqHeader = {
                "Authorization": `Bearer ${token} `,
                "Content-Type": "multipart/form-data"
            }
            const userData=await getuserProfileData(reqHeader);
            if(userData.status==200){
                setEditUserData(userData.data);
            } else{
                console.log(userData.response.data);
                
            }
         }else{
            console.log("Missing Token");
            
         }
        }catch(err){
            console.log(err);
            
        }
    }

    const handleUpdate =async()=>{
        const{username,email,userProfile}=editUserData
        try{
          const reqBody=new FormData();
          reqBody.append('username',username);
          reqBody.append('email',email);
          preview?reqBody.append('userProfile',userProfile):reqBody.append('userProfile',editUserData.userProfile)

          const token=sessionStorage.getItem('token');
          if(token){
            const reqHeader = {
                "Authorization": `Bearer ${token} `,
                "Content-Type":preview?"multipart/form-data":"application/json"
              }
              const updatedData=await edituserProfileData(reqBody,reqHeader);
              console.log(updatedData);
              
              if(updatedData.status==200){
                  setEditUserData(updatedData.data)
                   setOpenModal(!openModal);
              }else{
                console.log(updatedData.response.data);
                
              }
          }
        }catch(err){
            console.log(err);
        }
    }

    const handleFileChange=(e)=>{
        const file=e.target.files[0];
        if(file){
          setEditUserData({...editUserData,userProfile:file});
          setpreview(URL.createObjectURL(file))
        }
      }

    const onCloseModalUser = () => setOpenModal(!openModal)
  return (
    <div>
          <div className="">
                <button className="p-4" onClick={handleEditUser}><i className="fa-regular fa-pen-to-square fa-xl"></i></button>
            </div>
            <Modal show={openModal} size="md" onClose={onCloseModalUser} popup>
                <Modal.Header>
                    <p className="text-xl font-medium text-gray-900 dark:text-white">Edit User Profile</p>
                    </Modal.Header>
                <Modal.Body>
                    <div className="space-y-4">

                    <div className="w-full flex items-center justify-center">
                        <label>
                            <input type="file" style={{ display: "none" }}
                            onChange={handleFileChange}/>
                            <div className="relative w-[100px] h-[100px] overflow-hidden rounded-full">
                                <img
                                    className="absolute inset-0 w-full h-full object-cover object-center"
                                    src={preview?preview:editUserData.userProfile?`${Server_Url}/Uploads/${editUserData.userProfile}`:`${prficon}`}
                                    alt="Profile Icon"
                                />
                            </div>
                        </label>
                    </div>
                    
                        <div>
                          <div className=" block">
                                <Label value="UserName" />
                            </div>
                            <TextInput
                                type="text"
                                placeholder='UserName' 
                                value={editUserData.username} 
                                onChange={e=>setEditUserData({...editUserData,username:e.target.value})}/>
                        </div>

                        <div>
                            <div className=" block">
                                <Label value="Email" 
                               />
                            </div>
                            <TextInput  placeholder='Email' type="text" 
                            value={editUserData.email}
                            onChange={e=>setEditUserData({...editUserData,email:e.target.value})}
                            />
                        </div>

                      

                        <div className="w-full flex justify-end ">
                            <Button onClick={handleUpdate}>Save</Button>
                        </div>
                      
                    </div>
                </Modal.Body>
            </Modal>
    </div>
  )
}

export default EditUserProfile
