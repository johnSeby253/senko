import { Table } from "flowbite-react"
import AdminHeader from "../Compontents/AdminHeader"
import { getOrdersBypickuped } from "../Services/All_Api";
import { useEffect, useState } from "react";

const AdminDeliveries = () => {
  const [orderPickuped,setOrderPickuped]=useState([]);

  const handleOrderByPickuped=async()=>{
    try{
     const allOrderByPickuped=await getOrdersBypickuped();
     if(allOrderByPickuped){
       setOrderPickuped(allOrderByPickuped.data);
      //  console.log("Data",allOrderByPickuped.data);
       
     }
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    handleOrderByPickuped();
  },[])
  return (
    <div>
    <div className="">
      <AdminHeader/>
    </div>
    <div className="w-full h-full flex justify-center flex-col items-center ">
      <h2 className="mt-10 font-bold text-4xl text-primary
      square:text-2xl square:mt-5
      watch:text-lg watch:mt-3">
          Delivery Lists</h2>
      <div className="w-[90%] h-full bg-slate-100 flex items-center justify-center p-5 mt-3
      lg:mt-10
      square:w-full square:p-2
      watch:mt-5 watch:p-2 watch:w-full ">
      
      <div className="overflow-x-auto w-full ">
    <Table >
      <Table.Head>
        <Table.HeadCell>_id</Table.HeadCell>
        <Table.HeadCell>User_id</Table.HeadCell>
        <Table.HeadCell>Pickup Agencie</Table.HeadCell>
        <Table.HeadCell>Pickup_Date</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
      {orderPickuped.length>0?orderPickuped.map(item=>(
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={item._id}>
          <Table.Cell >{item._id}</Table.Cell>
          <Table.Cell>{item.UserId}</Table.Cell>
          <Table.Cell>{item.fromAddress.nearestHub}</Table.Cell>
          <Table.Cell>{item.createdAt}</Table.Cell>
          <Table.Cell>{item.status}</Table.Cell>
        </Table.Row>
        )):<div><p>Nothing to Display</p></div>
          }
       
      </Table.Body>
    </Table>
  </div>
      

      </div>
    </div>
  </div>
  )
}

export default AdminDeliveries
