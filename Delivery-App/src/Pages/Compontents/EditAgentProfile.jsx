import { Button, Label, Modal, TextInput } from "flowbite-react";
import prficon from '../Images/loginicon.webp';
import { useState } from "react";

const EditAgentProfile = () => {
    const [openModal, setOpenModal] = useState(false);

    const handleEditagent = () => setOpenModal(true);
    const onCloseModalagent = () => setOpenModal(false)
    return (
        <div>
            <div className="">
                <button className="p-4" onClick={handleEditagent}><i className="fa-regular fa-pen-to-square fa-xl"></i></button>
            </div>
            <Modal show={openModal} size="md" onClose={onCloseModalagent} popup>
                <Modal.Header>
                    <p className="text-xl font-medium text-gray-900 dark:text-white">Edit Agent Profile</p>
                    </Modal.Header>
                <Modal.Body>
                    <div className="space-y-4">

                    <div className="w-full flex items-center justify-center">
                        <label>
                            <input type="file" style={{ display: "none" }}/>
                            <div className="relative w-[100px] h-[100px] overflow-hidden rounded-full">
                                <img
                                    className="absolute inset-0 w-full h-full object-cover object-center"
                                    src={prficon}
                                    alt="Profile Icon"
                                />
                            </div>
                        </label>
                    </div>
                    
                        <div>
                          <div className=" block">
                                <Label value="Agent Name" />
                            </div>
                            <TextInput
                                type="text"
                                placeholder='Agent Name' />
                        </div>

                        <div>
                            <div className=" block">
                                <Label value="Email" 
                               />
                            </div>
                            <TextInput  placeholder='Email' type="text" />
                        </div>

                        <div>
                            <div className=" block">
                                <Label value="Branch" />
                            </div>
                            <TextInput type="text"
                              placeholder='Branch' />
                        </div>

                        <div>
                            <div className=" block">
                                <Label value="Location" 
                               />
                            </div>
                            <TextInput  placeholder='Location' type="text" />
                        </div>

                        <div className="w-full flex justify-end ">
                            <Button>Save</Button>
                        </div>
                      
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default EditAgentProfile
