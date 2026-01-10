import { Table } from "flowbite-react"
import AdminHeader from "../Compontents/AdminHeader"
import { useEffect, useState } from "react"
import { getOrdersBypending } from "../Services/All_Api";

const AdminPickups = () => {
  const [orderPending,setOrderPending]=useState([]);

  const handleOrderByPending=async()=>{
    try{
     const allOrderByPending=await getOrdersBypending();
     if(allOrderByPending){
       setOrderPending(allOrderByPending.data);
      //  console.log("Data",allOrderByPending.data);
       
     }
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    handleOrderByPending();
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
          Pickup Lists</h2>
      <div className="w-[90%] h-full bg-slate-100 flex items-center justify-center p-5 mt-3
      lg:mt-10
      square:w-full square:p-2
      watch:mt-5 watch:p-2 watch:w-full ">
      
      <div className="overflow-x-auto w-full ">
    <Table >
      <Table.Head>
        <Table.HeadCell>_id</Table.HeadCell>
        <Table.HeadCell>Order_id</Table.HeadCell>
        <Table.HeadCell>Pickup Agencie</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {orderPending.length>0?orderPending.map(item=>(
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={item._id}>
          <Table.Cell >{item._id}</Table.Cell>
          <Table.Cell>Order_21212</Table.Cell>
          <Table.Cell>Angamaly</Table.Cell>
          <Table.Cell>Pending</Table.Cell>
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

export default AdminPickups
