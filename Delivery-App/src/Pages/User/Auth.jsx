/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import LandingHeader from "../Compontents/LandingHeader"
import { useContext, useState } from "react";
import { userLogin, userRegister } from "../Services/All_Api";
import { TokenAuthContextUser } from "../ContextApi/TokenAuth";

const Auth = ({register}) => {
  // eslint-disable-next-line no-unused-vars
  const { isAuthorizedUser, setIsAuthorizedUser }=useContext(TokenAuthContextUser)
    const isRegisterForm = register ? true : false;
    const navigate=useNavigate();
    const[userData,setUserData]=useState({
      username:'',
      email:'',
      password:''
    });

    const handleRegister=async(e)=>{
      e.preventDefault()
      const {username,email,password}=userData;
      if(!username||!email||!password){
        alert("Please fill the Empty Fields")
      }else{
        try{
          const registeredUser=await userRegister(userData);
          if(registeredUser.status == 200){
            alert(`${registeredUser.data.username} Registerd SuccessFully`)
            navigate('/login');
            setUserData({username:"",email:"",password:''})
          }else{
            console.log(registeredUser.response.data);
          }
        }catch(err){
        console.log("Catch Error in Auth.js/handleRegister::::::",err);
        }
      }
    }

    // handleLogin();
    const handleLogin=async(e)=>{
      e.preventDefault()
      const {email,password}=userData
      if(!email||!password){
        alert("Please fill The Empty fields")
      }else{
        try{
          const loginedUser=await userLogin(userData);          
          if(loginedUser.status==200){
            sessionStorage.setItem("username", loginedUser.data.existingUser.username);
            sessionStorage.setItem("token", loginedUser.data.token);
            navigate('/home');
            setIsAuthorizedUser(true);
            setUserData({email:'',password:''});
          }else{
            console.log(loginedUser.response);
            
          }
        }catch(err){
           console.log("Error at Auth.js/handleLogin:::::",err);
           
        }
      }
    }

  return (
    <div>
     <div className="h-screen flex flex-col">
        <div className="z-10 relative ">
            <LandingHeader/>
        </div>
      <div className="flex-grow flex justify-center items-center">
      <div className=" h-[90%] bg-primary  rounded-tl-[300px]  rounded-br-[300px] flex flex-col items-center justify-center
     lg:w-[50%]
     sm:w-[90%]
     square:w-[90%] ">
       <div className="InputFields 
       square:flex square:items-center square:flex-col">
       {isRegisterForm?
        <h1 className="text-slate-100 font-semibold
        lg:text-3xl
        sm:text-3xl sm:mb-3
        square:text-2xl square:mb-3">Register</h1>:
        <h1 className="text-slate-100 font-semibold
        lg:text-3xl
         sm:text-3xl sm:mb-3
        square:text-2xl square:mb-3">Login</h1>
        }
        <div className="flex flex-col
        lg:mt-5
        square:w-[80%] square:mt-4 square:p-2">
           {isRegisterForm&&
           <div className="flex flex-col">
            <label className="text-white mt-2" htmlFor="">UserName</label>
            <input className="rounded-md" type="text"
            onChange={e=>setUserData({...userData,username:e.target.value})} />
            </div>
            }
            <label className="text-white mt-2" htmlFor="">Email</label>
            <input className="rounded-md" type="text"
            onChange={e=>setUserData({...userData,email:e.target.value})} />
            <label className="text-white mt-2" htmlFor="">Password</label>
            <input className="rounded-md" type="text"
            onChange={e=>setUserData({...userData,password:e.target.value})} />

            {
                  isRegisterForm?
                  <div></div>:
                   <a className='text-red-600' href="">forgot password?</a>
                 
                 }
           
            {isRegisterForm?
            <div className="flex flex-col p-3">
            <button className=" bg-slate-100 rounded-sm font-semibold
            lg:mt-5 w-[50%] lg:p-1 lg:ps-3 lg:pe-3 
            sm:mt-4 sm:p-1
             square:mt-3 square:p-1 square:ps-3 square:pe-3"
             onClick={handleRegister}>
                Register
            </button> 
            <label className="mt-4 text-white" htmlFor="">Click you have Already an Account?..
            <Link to={'/login'}>Login</Link>
            </label>
            </div>:
            <div className="flex flex-col p-3">
            <button className="w-[50%] bg-slate-100 rounded-sm font-semibold
            lg:mt-5  lg:p-1 lg:ps-3 lg:pe-3 
             sm:mt-4 sm:p-1
            square:mt-3 square:p-1 square:ps-3 square:pe-3"
            onClick={handleLogin}>
                Login
            </button>
            <label className='mt-4 text-white'>
                    {"  Doesn't have an Account ?"}
                      <Link className='mt-4 text-white'  to={'/register'}>
                      SignUp for Free</Link>
                    </label>

            </div>

           }

        </div>
        

       </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Auth
