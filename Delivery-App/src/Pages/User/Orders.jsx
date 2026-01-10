import { useEffect, useState } from "react";
import UserHeader from "../Compontents/UserHeader"
import { Modal, TextInput } from "flowbite-react";
import { cancelOrder, editUserOrderById, getUserOrderById, getUserOrderList } from "../Services/All_Api";


const Orders = () => {
    const [openModal, setOpenModal] = useState(false);
    const [order, setOrder] = useState([]);
    const [orderById, setOrderById] = useState({
        fromAddress: { customerName: "", address: "", MobNo: "", pinCode: "" },
        toAddress: { customerName: "", address: "", MobNo: "", pinCode: "" },
        status:""
    });


    const getUserOrders = async () => {
        try {
            const token = sessionStorage.getItem('token');
            if (token) {
                const reqHeader = {
                    "Authorization": `Bearer ${token} `,
                    "Content-Type": "application/json"
                }
                const orderList = await getUserOrderList(reqHeader);
                console.log("Data:", orderList.data);

                if (orderList.status == 200) {
                    setOrder(orderList.data);
                } else {
                    console.log("Coudn't get the orderList:::::");

                }
            }
        } catch (err) {
            console.log(err);

        }
    }

    const getOrderById = async ({ order_id }) => {
        setOpenModal(!openModal)
        try {
            const getOrder = await getUserOrderById(order_id);

            if (getOrder.status === 200) {
                setOrderById(getOrder.data);
            } else {
                console.log("Cannot find OrderById:::::");
            }

        } catch (err) {
            console.log(err);

        }
    }

    const editOrderById = async ({order_id}) => {
        setOpenModal(!openModal);
        try {
            const token = sessionStorage.getItem('token');
            if (token) {
                const reqHeader = {
                    "Authorization": `Bearer ${token} `,
                    "Content-Type": "application/json"
                }
                const updatedOrder = await editUserOrderById(order_id,orderById,reqHeader);
                if (updatedOrder.status === 200) {
                    setOrderById(updatedOrder.data);
                    getUserOrders();
                }
                else{
                    console.log("Cannot get updateOrder::::");   
                }
            }else{
                console.log("Cannot fin token Please Login:::::");
            }     
        } catch (err) {
            console.log(err);
        }
    }

    const cancelTheOrder=async({order_id})=>{
     
        try{
          const updatedStatus=await cancelOrder(order_id);
          if(updatedStatus.status==200&& updatedStatus.data.status=="Cancelled"){
            // console.log(updatedStatus.data);
            alert("Do you Want to Cancel the Order::::"); 
            setOrderById(updatedStatus.data);
            getUserOrders();  
          }
        }catch(err){
            console.log(err);
            
        }
    }

    useEffect(() => {
        getUserOrders();
    }, [])


    return (
        <>
            <div className="headr">
                <UserHeader />
            </div>

            {/* card Starts */}
            {order.length > 0 ? order.map(item => (
                <div className="cards flex items-center justify-center" key={item._id}>
                    <div className="w-[70%] h-full mt-10  bg-slate-200 flex items-center p-10 rounded">
                        <div className="w-[80%] h-full  flex justify-center items-center">
                            <div className="from w-[40%] h-[90%] bg-slate-100 rounded-2xl p-5 text-left">
                                <h2>From:</h2>
                                <p>{item.fromAddress.customerName}</p>
                                <p>{item.fromAddress.address}</p>
                                <p>{item.fromAddress.fromLocation}</p>
                                <p>{item.fromAddress.MobNo}</p>
                                <p>{item.fromAddress.pinCode}</p>
                            </div>
                            <div className="arrow w-[20%] h-[90%]  flex items-center justify-center">
                                <i className="fa-solid fa-arrow-right fa-2xl"></i>
                            </div>
                            <div className="to  w-[40%] h-[90%] bg-slate-100 rounded-2xl p-5 text-left">
                                <h2>To:</h2>
                                <p>{item.toAddress.customerName}</p>
                                <p>{item.toAddress.address}</p>
                                <p>{item.toAddress.toLocation}</p>
                                <p>{item.toAddress.MobNo}</p>
                                <p>{item.toAddress.pinCode}</p>
                            </div>
                        </div>
                        <div className="w-[30%] h-full flex justify-center items-center ">
                            <div className="w-[90%] h-[90%] rounded-2xl flex flex-col  items-center  ">
                                {item.status == 'Pending' ? (<div className="flex flex-col items-center">
                                    <p className="text-lg">Status : <span className="text-primary font-semibold">{item.status}</span></p>
                                    <button className="w-full h-[20px] bg-red-700 p-5 flex justify-center items-center text-white rounded mt-5"
                                    onClick={()=>cancelTheOrder({order_id:item._id})}>
                                        Cancel
                                    </button>
                                    <button onClick={() => getOrderById({ order_id: item._id })} className="mt-10">
                                    <i className="fa-solid fa-pen-to-square fa-lg"></i></button>
                                    
                                </div>) :
                                    <p className="text-lg">Status : <span className="text-red-600 font-semibold">{item.status}</span></p>
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            )) : <p>Nothing To Display</p>

            }

            {/* Modal Starts here */}
            <Modal show={openModal} size="xl" popup onClose={() => setOpenModal(false)} >
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit Your Order</h3>
                        <p className="text-red-600">Location Cannot be change...</p>
                        <div className="">
                            <p>From Address:</p>
                            <div className="mt-2">
                                <TextInput
                                    type="text"
                                    value={orderById.fromAddress.customerName||""}
                                    onChange={e=>setOrderById({...orderById,fromAddress:{...orderById.fromAddress,
                                    customerName:e.target.value}})}
                                    placeholder='CustomerName'
                                />
                            </div>

                            <div className="mt-2">
                                <TextInput
                                    type="text"
                                    value={orderById.fromAddress.address||""}
                                    onChange={e=>setOrderById({...orderById,fromAddress:{...orderById.fromAddress,
                                    address:e.target.value}})}
                                    placeholder='Address'
                                />
                            </div>

                            <div className="mt-2">
                                <TextInput
                                    type="text"
                                    value={orderById.fromAddress.MobNo||""}
                                    onChange={e=>setOrderById({...orderById,fromAddress:{...orderById.fromAddress,
                                    MobNo:e.target.value}})}
                                    placeholder='Mob.No'
                                />
                            </div>

                            <div className="mt-2">
                                <TextInput
                                    type="text"
                                    value={orderById.fromAddress.pinCode||""}
                                    onChange={e=>setOrderById({...orderById,fromAddress:{...orderById.fromAddress,
                                    pinCode:e.target.value}})}
                                    placeholder='PinCode'
                                />
                            </div>

                        </div>

                        <div className="">
                            <p>To Address:</p>
                            <div className="">
                                <div className="mt-2">
                                    <TextInput
                                        type="text"
                                        value={orderById.toAddress.customerName||""}
                                        onChange={e=>setOrderById({...orderById,toAddress:{...orderById.toAddress,
                                        customerName:e.target.value}})}
                                        placeholder='CustomerName'
                                    />
                                </div>

                                <div className="mt-2">
                                    <TextInput
                                        type="text"
                                        value={orderById.toAddress.address||""}
                                        onChange={e=>setOrderById({...orderById,toAddress:{...orderById.toAddress,
                                        address:e.target.value}})}
                                        placeholder='Address'
                                    />
                                </div>

                                <div className="mt-2">
                                    <TextInput
                                        type="text"
                                        value={orderById.toAddress.MobNo||""}
                                        onChange={e=>setOrderById({...orderById,toAddress:{...orderById.toAddress,
                                        MobNo:e.target.value}})}
                                        placeholder='Mob.No'
                                    />
                                </div>

                                <div className="mt-2">
                                    <TextInput
                                        type="text"
                                        value={orderById.toAddress.pinCode||""}
                                        onChange={e=>setOrderById({...orderById,toAddress:{...orderById.toAddress,
                                        pinCode:e.target.value}})}
                                        placeholder='PinCode'
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button className=" me-5 bg-primary w-[20%] p-2 rounded-md text-white"
                             onClick={()=>editOrderById({order_id:orderById._id})}>
                                Save</button>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>
            {/* Modal ends Here */}
        </>
    )
}

export default Orders
