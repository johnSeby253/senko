import { Table } from "flowbite-react"
import AdminHeader from "../Compontents/AdminHeader"
import prficon from '../Images/loginicon.webp';
import { useEffect, useState } from "react";
import { getAllUsers } from "../Services/All_Api";
import { Server_Url } from "../Services/Server_Url";


const AdminUserDetails = () => {
  const [allUserData, setAllUserData] = useState([]);

  const handleAllUserData = async () => {
    try {
      const alluser = await getAllUsers();
      if (alluser.status == 200) {
        setAllUserData(alluser.data);
        // console.log("AlluserData",alluser);
        
      } else {
        console.log("Error in AllUSerDATA inAdmin");

      }
    } catch (err) {
      console.log(err);

    }
  }

  useEffect(() => {
    handleAllUserData();
  }, [])
  return (
    <div>
      <div className="">
        <AdminHeader />
      </div>
      <div className="w-full h-full flex justify-center flex-col items-center ">
        <h2 className="mt-10 font-bold text-4xl text-primary
      square:text-2xl square:mt-5
      watch:text-lg watch:mt-3">
          User Details</h2>
        <div className="w-[90%] h-full bg-slate-100 flex items-center justify-center p-5 mt-3
      lg:mt-10
      square:w-full square:p-2
      watch:mt-5 watch:p-2 watch:w-full ">

          <div className="overflow-x-auto w-full ">
            <Table >
              <Table.Head>
                <Table.HeadCell>User_id</Table.HeadCell>
                <Table.HeadCell>UserName</Table.HeadCell>
                <Table.HeadCell>User_Email</Table.HeadCell>
                <Table.HeadCell>Profile</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {allUserData.length > 0 ? allUserData.map(item => (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={item._id}>
                    <Table.Cell >{item._id}</Table.Cell>
                    <Table.Cell>{item.username}</Table.Cell>
                    <Table.Cell>{item.email}</Table.Cell>
                    <Table.Cell><img className="w-[60px] "
                    src={item.userProfile?`${Server_Url}/Uploads/${item.userProfile}`:`${prficon}`}>
                      </img></Table.Cell>
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

export default AdminUserDetails
