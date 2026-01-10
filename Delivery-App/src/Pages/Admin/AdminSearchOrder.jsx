import AdminHeader from "../Compontents/AdminHeader"

const AdminSearchOrder = () => {
  return (
    <div>
      <div className="">
        <AdminHeader/>
      </div>

      <div className="w-full  h-full p-5 flex items-center justify-center">
        <div className="w-[90%] h-full bg-slate-300 p-5 mt-8 flex items-center justify-center flex-col">
            <div className="w-80%  flex items-center justify-center bg-red-200">
                <input className="w-[50%]" type="search" />
               <button className="bg-primary ps-3 pe-3 p-2 ms-4 text-white ">
               <i className="fa-solid fa-magnifying-glass" style={{color: '#e5e7eb'}}></i> Search</button>
            </div>

            <div className="w-[90%] bg-slate-100">
            <div className="card w-[80%] h-full bg-slate-300 flex items-center justify-center flex-col rounded-md mt-10
        lg:w-80%
        sm:flex-row sm:w-[95%] sm:p-2 sm:justify-evenly 
       square:w-full square:p-2
       watch:flex watch:w-full watch:p-2
         " >

          <div className="from w-[40%] bg-slate-100 rounded-lg
          lg:w-[30%]
          lg:p-5
          sm:p-2
         square:w-full square:p-3
         watch:w-full watch:p-5 
         ">
            <h2>From:</h2>
            <p>John Seby</p>
            <p>P*******y K****an (H)</p>
            <p>Angamaly,Thuravoor</p>
            <p>85******52</p>
            <p>68**72</p>
          </div>

          <div className="arrows">
            <div className="arrow w-[10%] hidden
            sm:block sm:p-2">
              <i className="fa-solid fa-arrow-right fa-2xl"></i>
            </div>
            <div className="arrow w-[10%] hidden
            square:block square:p-3
          watch:block watch:p-2 ">
              <i className="fa-solid fa-arrow-down fa-2xl"></i>
            </div>
          </div>

          <div className="to w-[40%] bg-slate-100 rounded-lg
           lg:w-[30%]
          lg:p-5
          sm:p-2
          square:w-full square:p-3
          watch:w-full watch:p-5">
            <h2>To:</h2>
            <p>John Seby</p>
            <p>P*******y K****an (H)</p>
            <p>Angamaly,Thuravoor</p>
            <p>85******52</p>
            <p>68**72</p>
          </div>

          <div className="btnn w-[10%] 
          lg:p-5
          sm:w-[20%] sm:p-2
          square:w-[60%] square:m-4
          watch:w-80% watch:m-5">
            <button 
              className="bg-primary p-2 w-full rounded-md text-white">View More</button>
          </div>
        </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSearchOrder
