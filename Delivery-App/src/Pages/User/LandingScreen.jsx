import LandingHeader from "../Compontents/LandingHeader"

const LandingScreen = () => {
  return (
    <div>
        <div className="h-screen flex flex-col">
        <div className="z-10 relative ">
            <LandingHeader/>
        </div>
      <div className="flex-grow flex justify-center items-center">
        <div className="w-[90%] h-[90%] bg-primary  rounded-tl-[100px]  rounded-br-[100px] flex flex-col justify-between">
            <div className=" w-full h-[30%] flex justify-end">
            <img className=" " src="https://i.pinimg.com/originals/63/30/4c/63304c0ead674232ee58af3dbc63b464.gif" alt="" />
            </div>

<div className="w-full h-[40%]  flex items-center justify-center flex-col">
    <p className="font-bold font-serif text-yellow-400
    lg:text-5xl
    sm:text-3xl sm:ps-5
    square:text-2xl square:p-3
    watch:text-sm">Make a Fast Delivery with Affordable Price....!</p>
    <p className="font-medium text-white
    lg:text-2xl lg:mt-4
    sm:text-xl sm:p-2
    square:ps-4 
    watch:text-xs">A commitment to innovation and sustainability
    </p>
    <button className="bg-slate-200 text-primary rounded-md font-bold
    lg:ps-5 lg:pe-5 lg:p-3 lg:mt-10 
    sm:ps-3 sm:pe-3 sm:p-1 sm:mt-2
    square:ps-2 square:pe-2 square:mt-4 square:p-1
    watch:z-10 watch:font-medium"><a href="/login">Ready To Explore</a></button>
</div>

           <div className=" w-full h-[30%] flex">
           <img className="" src="https://media.tenor.com/LeSVOZJUt-oAAAAM/muuve-rider.gif" alt="" />
           </div>
        </div>
      </div>
        </div>
     
    </div>
  )
}

export default LandingScreen
