import { useEffect, useRef, useState } from "react"
import UserHeader from "../Compontents/UserHeader";
import deliveryboy from '../Images/yellowdeliveryboy.webp';
import deliveryvan from '../Images/deliveryvan.webp';
import { Button, Label, Modal, Radio } from "flowbite-react";
import axios from "axios";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { addNewPaymentDetails, createOrderByUser, getNearestHubs } from "../Services/All_Api";




const PickUp = () => {
    const [hub,setHub]=useState([]);
    const [showMap, setShowMap] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [startCoordinates, setStartCoordinates] = useState(null);
    const [endCoordinates, setEndCoordinates] = useState(null);
    const mapRef = useRef(null);
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const [price, setPrices] = useState('');
    const [orderData, setOrderData] = useState({
        fromAddress: {
            customerName: "",
            address: "",
            MobNo: "",
            fromLocation: "",
            pinCode: "",
            nearestHub: ""
        },
        toAddress: {
            customerName: "",
            address: "",
            MobNo: "",
            toLocation: "",
            pinCode: ""
        },
    });


    const access_key = import.meta.env.VITE_DISTANCE_API_KEY;
    const postionKey = import.meta.env.VITE_COORDINATE_API_KEY;

    const handleProcced = async () => {
        handleShowMap();
        const {
            fromAddress: {
                customerName: fromCustomerName,
                address: fromAddress,
                MobNo: fromMobNo,
                fromLocation,
                pinCode: fromPinCode,
                nearestHub
            },
            toAddress: {
                customerName: toCustomerName,
                address: toAddress,
                MobNo: toMobNo,
                toLocation,
                pinCode: toPinCode
            }
        } = orderData;
        try {
            const isAddressComplete = (address) => {
                return Object.values(address).every((field) => field !== "");
            };

            const isFromAddressComplete = isAddressComplete({
                customerName: fromCustomerName,
                address: fromAddress,
                MobNo: fromMobNo,
                fromLocation,
                pinCode: fromPinCode,
                nearestHub
            });

            const isToAddressComplete = isAddressComplete({
                customerName: toCustomerName,
                address: toAddress,
                MobNo: toMobNo,
                toLocation,
                pinCode: toPinCode
            });

            if (!isFromAddressComplete || !isToAddressComplete) {
                alert("Check Any Fields is Missing");
            } else {
                const token = sessionStorage.getItem('token');
                if (token) {
                    const reqHeader = {
                        "Authorization": `Bearer ${token} `,
                        "Content-Type":"application/json"
                    }
                    const orderDetails=await createOrderByUser(orderData,reqHeader);
                    // console.log("Data:",orderDetails.data);
                    
                    if(orderDetails.status==201){
                        setOrderData(orderDetails.data);
                    }else{
                        console.log(orderDetails.response);        
                    }
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    // <<....Show the map and text div by call apis...>>
    const handleShowMap = async () => {
        setShowMap(true);
        const {fromAddress,toAddress}=orderData
        try {
            if (!fromAddress.fromLocation || !toAddress.toLocation) {
                alert("Please Enter Both Addresses");
                setShowMap(false);
                return;
            }

            // Call Distance Matrix API to get distance and duration
            const response = await axios.get(`https://api.distancematrix.ai/maps/api/distancematrix/json`, {
                params: {
                    key: access_key,
                    origins: fromAddress.fromLocation,
                    destinations: toAddress.toLocation,
                },
            });

            if (response.status === 200) {
                const data = response.data;

                // Extract addresses, distance, and duration
                const originAdd = data.origin_addresses[0];
                const destinationAdd = data.destination_addresses[0];
                const distanceFromApi = data.rows[0].elements[0].distance.value;
                const durationFromApi = data.rows[0].elements[0].duration.value / 60;

                const distanceInKm = (distanceFromApi / 1000).toFixed(1);
                setDistance(`${distanceInKm}`);
                setDuration(Math.round(durationFromApi));

                // Calculate Pricing
                const calculatePrice = (distance) => {
                    const baseRate = 80;
                    const extraDistance = Math.max(0, Math.round(distance - 20));
                    return baseRate + extraDistance * 40;
                };
                setPrices(calculatePrice(distanceInKm));

                if (originAdd != " " && !destinationAdd !== " ") {
                    console.log(originAdd);

                    try {
                        const originRes = await axios.get(`https://api.distancematrix.ai/maps/api/geocode/json`, {
                            params: {
                                address: originAdd,
                                key: postionKey
                            }
                        });

                        const destRes = await axios.get(`https://api.distancematrix.ai/maps/api/geocode/json`, {
                            params: {
                                address: destinationAdd,
                                key: postionKey
                            }
                        });

                        if (originRes.status == 200 && destRes.status == 200) {
                            const originCoord = originRes.data.result[0].geometry.location;
                            const destCoord = destRes.data.result[0].geometry.location;

                            const originLatitude = originCoord.lat;
                            const originLongitude = originCoord.lng;
                            const destLatitude = destCoord.lat;
                            const destLongitude = destCoord.lng;

                            console.log('Origin Coordinates:', originLatitude, originLongitude);
                            console.log('Destination Coordinates:', destLatitude, destLongitude);
                            setStartCoordinates([originLatitude, originLongitude]);
                            setEndCoordinates([destLatitude, destLongitude]);
                        }

                    } catch (err) {
                        console.log(err);
                        console.log("Error in Catch Origin Address");
                    }
                } else {
                    console.log("Api Error In fetching Coordinates PostitionKey");

                }
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred while trying to fetch data');
        }
    }

    const getNearestHub=async()=>{
        try{
           const location=await getNearestHubs();
           if(location.status===200){
            setHub(location.data)
           }else {
            console.log('Failed to fetch hubs:', location);
        }
        }catch(err){
            console.log(err);    
        }
    }

    const PaymentProcced=async({order_id})=>{
         const reqBody = { paymentAmount: price };
        console.log(reqBody);
        console.log(order_id);
        
        try{
         const orderPayment=await addNewPaymentDetails(order_id,reqBody);
         console.log("orderPay:",orderPayment.data);
         setOpenModal(false);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getNearestHub();
    },[])

    useEffect(() => {
        if (showMap && !mapRef.current && startCoordinates && endCoordinates) {
            const map = L.map('map').setView(startCoordinates, 13);
            mapRef.current = map;
            // <<...Map Tile...>>>
            L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
                maxZoom: 19,
            }).addTo(map);

            //<<... Start and End Locations...>>
            L.marker(startCoordinates).addTo(map)
                .bindPopup(`<b>Start Location</b><br>${orderData.fromAddress}`).openPopup();
            L.marker(endCoordinates).addTo(map)
                .bindPopup(`<b>End Location</b><br>${orderData.toAddress}`).openPopup();

            // Route polyline line through map
            const polyline = L.polyline([startCoordinates, endCoordinates], {
                color: 'blue',
                weight: 4,
                opacity: 0.7,
                dashArray: '10, 10',
                lineJoin: 'round',
            }).addTo(map);
            map.fitBounds(polyline.getBounds());
        }

        return () => {
            if (mapRef.current && !showMap) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [showMap, startCoordinates, endCoordinates]);

    const handleMapclose = () => setShowMap(false)
    const handlePayment = () => setOpenModal(!openModal);

    return (
        <>
            <div className="headr">
                <UserHeader />
            </div>
            <div className="cvr flex items-center justify-center flex-col ">

                <div className="w-full h-[500px] bg-primary flex justify-end items-center
                square:h-full square:pb-3
                  watch:h-full ">
                    <div className="w-[95%] h-[90%] rounded-tl-[400px] bg-white  flex justify-center items-center
                     ">
                        <div className="lg:w-[20%] 
                        sm:w-[50%]
                        square:w-[50%]
                       watch:w-[50%]">
                            <img src={deliveryboy} alt="" />
                        </div>
                        <div className="w-full flex flex-col  items-end
                        lg:items-center
                        square:justify-end
                        watch:justify-end">

                            <div className="w-[90%] flex flex-col  items-center 
                            lg:p-10 lg:items-center
                            sm:items-end sm:p-3
                            square:items-end square:p-4
                            watch:items-end watch:p-4">
                                <p className="font-bold text-3xl text-primary
                                watch:text-lg ">Ship Now</p>
                                <p className="text-xl font-medium text-primary
                                lg:text-center
                                sm:text-end sm:mt-3
                                square:hidden
                                watch:hidden">
                                    Packages and pallets, big and small, we can offer you instant delivery
                                    options for your shipping needs, both domestically and internationally.
                                    Fill out your shipment details below and we’ll provide services tailored
                                    to your specific requirements. Simply pick the option that suits you best,
                                    and continue to book.
                                </p>
                            </div>
                            <div className="w-full flex 
                            lg:justify-center p-3
                            square:flex-col square:items-end square:p-2 square:text-end
                            watch:flex-col watch:items-end watch:p-2 watch:text-end">

                                <div className="flex flex-col justify-center items-center 
                                lg:p-3
                                md:p-3
                                sm:text-center
                                square:flex-row square:justify-end square:p-2
                                watch:flex-row watch:justify-end watch:p-2 ">
                                    <p className="font-bold  text-2xl text-red-700
                                   square:text-lg
                                    watch:text-sm ">1.</p>
                                    <p className="text-lg font-medium
                                    lg:text-lg
                                    sm:text-sm sm:p-1
                                    watch:text-xs" >ENTER ORGIN AND DESTINATION</p>
                                </div>

                                <div className="flex flex-col justify-center items-center 
                                 lg:p-3
                                 md:p-3
                                 sm:text-center
                                 square:flex-row square:w-full square:justify-end square:p-2
                                watch:flex-row watch:w-full watch:justify-between watch:p-2 ">
                                    <p className="font-bold  text-2xl text-red-700
                                    square:text-lg
                                    watch:text-sm  ">2.</p>
                                    <p className="text-lg font-medium
                                    lg:text-lg
                                    sm:text-sm sm:p-1
                                    watch:text-xs" >  GET DELIVERY PRICES </p>
                                </div>

                                <div className="flex flex-col justify-center items-center
                                 lg:p-3 
                                 md:p-3
                                 sm:text-center
                                 square:flex-row square:justify-end square:p-2 
                                   watch:flex-row watch:justify-end watch:p-2 ">
                                    <p className="font-bold text-2xl text-red-700
                                    square:text-lg
                                    watch:text-sm">3.</p>
                                    <p className="text-lg font-medium
                                    lg:text-lg
                                    sm:text-sm sm:p-1
                                    watch:text-xs">PROCEED WITH ONLINE BOOKING</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


                <div className="w-[80%] h-[500px] bg-gray-300   flex justify-center items-center
                lg:flex-row
                    sm:h-full sm:flex-col sm:mt-2
                    square:h-full square:flex-col square:w-full 
                    watch:h-full watch:flex-col watch:w-full">

                    <div className="w-1/2  h-full border-2 flex flex-col justify-center items-center
                        sm:w-full
                        square:w-full
                        watch:w-full">
                        <h3 className="mb-5 text-3xl font-bold text-primary
                        square:text-xl
                        watch:text-lg">PickUp Field</h3>
                        <input type="text" className=" w-80% p-2 m-2" placeholder="Customer Name" 
                        onChange={e=>setOrderData({...orderData,fromAddress:{...orderData.fromAddress,customerName:e.target.value}})} />
                        <input type="text" className="w-80% p-2 m-2" placeholder="Pickup Address"
                        onChange={e=>setOrderData({...orderData,fromAddress:{...orderData.fromAddress,
                        address:e.target.value}})} />
                        <input type="text" className="w-80% p-2 m-2" placeholder="Mob.No"
                        onChange={e=>setOrderData({...orderData,fromAddress:{...orderData.fromAddress,
                        MobNo:e.target.value}})} />
                        <input type="text" className="w-80% p-2 m-2" placeholder="Location"
                        onChange={e=>setOrderData({...orderData,fromAddress:{...orderData.fromAddress,
                        fromLocation:e.target.value}})} />
                        <input type="text" className="w-80% p-2 m-2" placeholder="Pin Code"
                        onChange={e=>setOrderData({...orderData,fromAddress:{...orderData.fromAddress,
                        pinCode:e.target.value}})} />

                        <select
                            id="hub-select"
                            value={orderData.fromAddress.nearestHub}
                            onChange={e=>setOrderData({...orderData,fromAddress:{...orderData.fromAddress,
                            nearestHub:e.target.value}})}
                            className="w-80% p-2 mt-1 border border-black shadow-sm">
                            <option value="" disabled>Select a Nearst Pickup Hub</option>
                            {hub.map((place, index) => (
                                <option key={index} value={place.agentLocation}>
                                    {place.agentLocation}
                                </option>
                            ))}
                        </select>


                        <button className="w-[200px] bg-primary text-white p-2 mt-3
                        sm:mb-2
                        square:w-[50%] square:mb-4
                        watch:p-1 watch:w-[50%] watch:mb-3"><a href="#delivery"
                        className="p-5">Next</a></button>
                    </div>

                    <div className="w-1/2  border-2 h-full flex flex-col justify-center items-center
                    sm:w-full
                    square:w-full
                    watch:w-full " id="delivery">
                        <h3 className="mb-5 text-3xl font-bold text-primary
                        sm:mt-3
                        square:text-xl
                        watch:text-lg watch:mt-3 watch:mb-2">Delivery Field</h3>
                        <input type="text" className=" w-80% p-2 m-2" placeholder="Customer Name"
                        onChange={e=>setOrderData({...orderData,toAddress:{...orderData.toAddress,
                        customerName:e.target.value}})} />
                        <input type="text" className="w-80% p-2 m-2" placeholder="Delivery Address"
                        onChange={e=>setOrderData({...orderData,toAddress:{...orderData.toAddress,
                        address:e.target.value}})} />
                        <input type="text" className="w-80% p-2 m-2" placeholder="Mob.No" 
                        onChange={e=>setOrderData({...orderData,toAddress:{...orderData.toAddress,
                        MobNo:e.target.value}})}/>
                        <input type="text" className="w-80% p-2 m-2" placeholder="Location" 
                        onChange={e=>setOrderData({...orderData,toAddress:{...orderData.toAddress,
                        toLocation:e.target.value}})} />
                        <input type="text" className="w-80% p-2 m-2" placeholder="Pin Code"
                        onChange={e=>setOrderData({...orderData,toAddress:{...orderData.toAddress,
                        pinCode:e.target.value}})}/>
                        <button className="w-[200px] bg-primary text-white p-2 mt-10
                        sm:mb-3
                        square:w-[50%] square:mb-3
                        watch:w-[50%] watch:p-1 watch:mb-3" onClick={handleProcced}>Procced</button>
                    </div>

                </div>



                <div className={`w-[50%] p-2 bg-gray-200 mt-10 flex-col flex  items-center z-10
                    ${showMap ? 'block' : 'hidden'}
                    lg:w-[50%]
                    sm:w-full
                    square:w-full square:mt-1
                    watch:w-full watch:mt-1`}>
                    <div className="w-full 
                    sm:p-2
                     square:p-2
                     watch:p-2 ">
                        <div className="w-full flex justify-end  " onClick={handleMapclose}><i className="fa-solid fa-x"></i></div>
                    </div>
                    <div className={`w-full p-2 bg-gray-300 flex justify-center items-center
                    square:flex-col
                        watch:flex-col`}>

                        <div className="w-full h-[90%] flex flex-col justify-center items-center">

                            <div className="w-[80%] h-[400px] bg-gray-500
                            sm:w-full sm:h-[350px]
                            square:w-full square:h-[300px]
                            watch:w-full watch:h-[200px] " id="map" >
                            </div>
                            <p className="p-5 text-lg font-medium">Duration: <span className="text-red-700 font-semibold">{duration} min</span></p>
                        </div>

                        <div className="w-full h-[90%] flex flex-col items-center">

                            <input type="text" className=" w-80% p-2 m-2" placeholder="Quanity" />
                            <input type="text" className=" w-80% p-2 m-2" placeholder="Weight (kg)" />
                            <input type="text" className=" w-80% p-2 m-2" placeholder="Height (cm)" />
                            <input type="text" className=" w-80% p-2 m-2" placeholder="Length (cm)" />
                            <div className="w-80% h-[50%] p-3  bg-white
                            watch:w-full">
                                <h2 className="text-2xl text-center">Total Amount</h2>
                                <p className="text-left font-semibold">Under 20km minimum delivery Charge is 80/- </p>
                                <p className="text-left font-semibold">Extra Km 40/- per Km</p>
                                <p className="text-left font-semibold">Total Distance: <span className="font-medium">{distance}</span></p>
                                <p className="text-left font-semibold">Total Amount: <span>{price}</span>/-</p>
                                <button className="w-[100%] bg-primary text-white p-2 mt-2" onClick={handlePayment}>Payment</button>
                            </div>
                        </div>
                    </div>
                </div>




                <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
                    <Modal.Header />
                    <Modal.Body >
                        <div className="space-y-6 ">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Payment Section</h3>
                            <div>
                                <div className="mb-2 block ">
                                    <Label value="Amount" />
                                </div>
                                <div className="text-3xl font-semibold text-primary w-full rounded-xl h-[50px] bg-slate-200 flex items-center justify-center">
                                    {price}</div>
                            </div>
                            <div>
                            </div>
                            <div className="flex justify-center">
                                <div className="flex flex-col items-start gap-4">
                                    <div className="flex items-center gap-2">
                                        <Radio id="cash-payment" name="payment-method" />
                                        <Label htmlFor="cash-payment">Cash on Delivery</Label>
                                    </div>
                                    {/* <div className="flex items-center gap-2">
                                        <Radio id="online-payment" name="payment-method" />
                                        <Label htmlFor="online-payment">Online Payment</Label>
                                    </div> */}
                                </div>
                            </div>
                            <div className="w-full flex items-center justify-center">
                                <Button onClick={()=>PaymentProcced({order_id:orderData._id})}>Procced</Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

                <div className="homImg w-full h-500px bg-primary flex items-center justify-start mt-10 
                sm:h-full sm:pt-2
                square:h-full square:pt-2
                watch:h-full watch:pt-2">
                    <div className="servis w-95% h-[90%] rounded-br-[400px] flex  items-center justify-start bg-white
                    sm:overflow-x-hidden sm:mb-4 sm:h-[400px] sm:mt-5
                    square:overflow-x-hidden">
                        <div className="w-[40%] flex flex-col p-10 
                        sm:w-[90%] sm:p-2
                        square:w-[80%] square:p-2 
                       watch:w-[80%] watch:p-2">
                            <p className="text-4xl font-medium text-primary mb-5
                            lg:text-2xl
                            sm:text-lg
                            square:text-lg
                             watch:text-sm watch:mb-2">
                                Fast, secure  domestic
                                delivery services for parcels and documents.
                                Available to private and business customers
                            </p>
                            <p className="text-lg font-medium text-primary
                           sm:text-lg
                            watch:text-xs watch:pe-2"><i className="fa-solid fa-phone"></i> 1800 209 1345 (toll free*)</p>
                        </div>
                        <div className="w-[40%]
                        square:w-[60%] 
                        watch:hidden">
                            <img className="" src={deliveryvan} alt="" />
                        </div>
                    </div>
                </div>


            </div>

        </>
    )
}

export default PickUp
