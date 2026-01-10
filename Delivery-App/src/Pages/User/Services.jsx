import UserHeader from "../Compontents/UserHeader"
import fastDelivery from '../Images/fastdelivry.png';
import secure from '../Images/secure.png';
import timehrs from '../Images/24hrs.png'


const Services = () => {
    return (
        <div>
            <div className="w-full bg-primary h-full">
                <div className="headr">
                    <UserHeader />
                </div>

                {/* First div start here */}
                <div className="homImg w-full h-[500px] bg-primary items-end flex justify-end flex-col mt-10
                square:h-[400px]
                watch:h-full">
                    <div className="imgdes w-95%  h-full rounded-tl-[400px] bg-white flex items-center justify-end ">
                        <div className="w-[90%] flex items-center justify-between p-10 
                        square:p-2 square:pt-5 square:pb-5">

                            <div className="w-[300px]
                            sm:w-[250px]
                            square:w-[150px]
                            watch:w-[100px] ">
                                <img src={fastDelivery} alt="" />
                            </div>
                            <div className="w-[60%] p-3">
                                <p className="font-extrabold text-5xl text-headcolor font-serif
                                lg:text-5xl
                                sm:text-3xl
                                square:text-2xl">Fast Delivery Services</p>
                                <p className="mt-4 text-2xl font-medium
                                lg:text-2xl
                                sm:text-lg
                                square:text-sm
                                watch:text-xs">Experience lightning-fast delivery with our
                                    efficient service on time. We prioritize speed, reliability,
                                    and convenience to meet your needs.
                                    Trust us for a hassle-free, fast delivery experience</p>
                            </div>
                        </div>


                    </div>
                </div>
                {/* First Div end here */}

                {/* 2nd div start here */}
                <div className="homImg w-full  h-[500px] bg-primary items-start flex justify-end flex-col mt-10
                  square:h-[400px]">
                    <div className="servis w-95%  h-full rounded-br-[400px] flex bg-white">
                        <div className="w-[90%] flex items-center justify-between p-10
                         square:p-2 square:pt-5 square:pb-5 ">

                            <div className=" w-[60%] flex flex-col  ">
                                <p className="font-extrabold mb-5 text-5xl text-headcolor font-serif
                                   lg:text-5xl
                                 sm:text-3xl
                                square:text-2xl">Secured</p>
                                <p className="text-2xl font-medium text-primary mb-5
                                lg:text-2xl
                                sm:text-lg
                                square:text-sm
                                watch:text-xs">
                                    Enjoy fast and secure delivery with our trusted
                                    shipping services. We ensure that your orders reach you quickly and safely.
                                </p>

                            </div>

                            <div className="w-[300px]
                            sm:w-[250px]
                            square:w-[150px]
                            watch:w-[100px] ">
                                <img src={secure} alt="" />
                            </div>


                        </div>
                    </div>
                </div>
                {/* 2nd Div end here */}

                {/* 3rd div start here */}

                    <div className="homImg w-full h-[500px] bg-primary items-end flex justify-end flex-col mt-10
                     square:h-[400px] square:mt-2
                watch:h-full">
                    <div className="imgdes w-95%  h-full rounded-tl-[400px] bg-white flex items-center justify-end ">
                        <div className="w-[90%] flex items-center justify-between p-10 
                        square:p-2 square:pt-5 square:pb-5
                      ">

                            <div className="w-[300px]
                              sm:w-[250px]
                              square:w-[150px]
                              watch:w-[100px] ">
                                <img src={timehrs  } alt="" />
                            </div>
                            <div className="w-[60%]
                             lg:p-10
                              watch:pe-3   watch:w-[50%]">
                                <p className="font-extrabold text-5xl text-headcolor font-serif
                                lg:text-5xl
                                sm:text-3xl
                                square:text-2xl
                                ">
                                24<span className="text-lg
                                watch:text-sm">hrs</span></p><p
                                className="font-extrabold text-5xl text-headcolor font-serif
                                 lg:text-5xl
                                sm:text-3xl
                                square:text-2xl
                                ">Services</p>
                                <p className="mt-4 text-2xl font-medium
                                lg:text-2xl
                                 sm:text-lg
                                square:text-sm
                                watch:text-xs">Experience lightning-fast delivery with our 24-hour service!
                                    We ensure your packages reach their destination quickly and reliably,
                                    all day, every day.</p>
                            </div>
                        </div>


                    </div>
                </div>
          
                {/* 3rd Div end here */}
            </div>
        </div>
    )
}

export default Services
