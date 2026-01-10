import { useState } from "react"

const LandingHeader = () => {
    const[isOpenTab,setIsOpenTab]=useState(false);

    const handleOpen=()=>{
        setIsOpenTab(!isOpenTab)
    }
  return (
    <div>
      <div className="w-full h-[60px] bg-primary flex items-center justify-between 
      sm:p-6
      square:p-6
      watch:p-6">
        <div className=" text-white 
        lg:text-3xl
        sm:text-2xl
        square:text-xl
        watch:text-lg "><a href="/">Delivery</a></div>

<div className=" gap-4 p-10 hidden
md:flex">
<div className="">
    <button className="p-2 ps-3 pe-3 bg-slate-200 rounded-lg"><a href="/login">Login</a></button>
</div>

<div className="">
    <button className="p-2 ps-3 pe-3 bg-slate-200 rounded-lg"><a href="/register">SignIn</a></button>
</div>
</div>

        <div onClick={handleOpen} className="
        md:hidden" ><i className="fa-solid fa-bars fa-xl" style={{color:"#f4f6fb"}}></i></div>
      </div>
     { isOpenTab &&
        <div className=" bg-primary absolute right-0 flex flex-col text-white border-t text-center
        sm:w-[40%]
        square:w-[40%]
       watch:w-[40%] ">
        <div className="w-full hover:bg-slate-100 hover:text-primary 
        
        sm:p-4
        square:p-3
        watch:p-3
        ">
            <a className="w-full " href="/login">Login</a>
        </div>
        <div className="w-full hover:bg-slate-100 hover:text-primary 
        sm:p-4
         square:p-3
        watch:p-3">
            <a className="w-full " href="/register">SignIn</a>
        </div>
      </div>
      }
    </div>
  )
}

export default LandingHeader
