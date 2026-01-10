import UserHeader from "../Compontents/UserHeader"
import skilleddriver from '../Images/skilleddriver.png';
import lookupdriver from '../Images/lookupdriver.webp'


const Home = () => {
    return (
        <>
            <div className="w-full bg-primary h-full">
                <div className="">
                    <UserHeader />
                </div>

                {/* First div start here */}
                <div className=" w-full h-[500px] bg-primary items-end flex justify-end flex-col mt-10
               square:h-[400px]
                watch:h-full ">
                    <div className=" w-95%  h-full rounded-tl-[400px] bg-white flex items-center justify-center
                    lg:overflow-hidden
                    sm:overflow-hidden
                    square:overflow-hidden square:ps-10 square:justify-between 
                    watch:justify-between watch:overflow-hidden  ">
                        <div className="w-[40%]">
                            <img src="https://www.shutterstock.com/image-vector/express-delivery-label-courier-boy-600nw-2050009979.jpg" alt="" />
                        </div>
                        <div className="w-[60%]">
                            <p className="font-extrabold text-headcolor font-serif
                            lg:text-5xl
                            sm:text-4xl
                            square:text-2xl
                            watch:text-xl watch:mt-5 watch:p-2">The Fastest Delivery Services</p>
                            <p className="mt-4 text-2xl font-medium
                            square:text-lg
                            watch:text-sm">We Love To Handle Your Package...!</p>
                            <div className="flex item center justify-center mt-10
                            lg:justify-start lg:ms-5
                            watch:m-3">
                                <button className="mt-4 p-3 bg-headcolor text-white rounded-lg text-lg font-semibold
                                square:text-lg  square:p-2
                                watch:text-sm watch:p-2 watch:mb-2">
                                    <a href="/orders">View Orders</a>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
                {/* First Div end here */}

                {/* 2nd div start here */}
                <div className="homImg w-full  h-[500px] bg-primary flex items-start flex-col mt-10
                square:h-[400px]
                watch:h-full">
                    <div className=" w-95%  h-full rounded-br-[400px] flex justify-center bg-white 
                    square:justify-between
                    watch:p-5">
                        <div className="w-[90%] flex items-center justify-between p-10
                        square:p-5
                        watch:p-2 ">

                            <div className=" w-[60%] flex flex-col">
                                <p className="font-extrabold mb-5 text-5xl text-headcolor font-serif
                                 lg:text-5xl
                                 sm:text-4xl
                                square:text-2xl 
                                watch:text-xl">Ship Now</p>
                                <p className="text-2xl font-medium text-primary mb-5
                                square:text-lg
                                watch:text-sm watch:mb-2">
                                    Fast, secure  domestic
                                    delivery services for parcels and documents.
                                    Available to private and business customers
                                </p>
                                <div className="flex justify-center items-center
                                square:justify-start">
                                    <button className="mt-4 p-2 bg-headcolor text-white rounded-lg text-lg font-semibold
                                    square:text-lg 
                                    watch:text-sm watch:mt-2 watch:mb-3 ">
                                        <a href="/pickup">Ship Now</a>
                                    </button>
                                </div>
                            </div>

                            <div className="w-[35%]">
                                <img src={skilleddriver} alt="" />
                            </div>


                        </div>
                    </div>
                </div>
                {/* 2nd Div end here */}

                {/* 3rd div start here */}
                <div className="homImg w-full  h-[500px] bg-primary items-end flex  flex-col pb-4
                sm:mt-10 
                square:h-[400px]
                watch:h-full">
                    <div className="servis w-95%  h-[90%] rounded-tl-[400px] flex items-center justify-end bg-white">
                        <div className="w-[90%] flex items-center justify-between  ">

                            <div className="w-[40%]">
                                <img className="
                                lg:w-[400px]" src={lookupdriver} alt="" />
                            </div>

                            <div className=" w-[50%] flex flex-col ">
                                <p className="font-extrabold mb-5 text-5xl text-headcolor font-serif
                                 lg:text-5xl
                                 sm:text-4xl
                                square:text-2xl
                                watch:text-xl watch:mt-7">Our Services</p>
                                <p className="text-2xl font-medium text-primary mb-5
                                square:text-lg
                                watch:text-sm">
                                  We provide A standard Services to All  The Customers
                                </p>
                                <div className="flex justify-center items-center">
                                    <button className="mt-4 p-3 bg-headcolor text-white rounded-lg text-lg font-semibold
                                    square:mb-4
                                    watch:text-sm watch:mt-2 watch:p-2 watch:mb-5">
                                        <a href="/services">View more</a>
                                    </button>
                                </div>
                            </div>




                        </div>
                    </div>
                </div>


                {/* 3rd Div end here */}
            </div>
        </>
    )
}

export default Home
