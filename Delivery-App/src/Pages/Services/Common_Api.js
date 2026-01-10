import axios from 'axios';

export const common_Api=async(httpRequest,url,reqBody,reqHeader)=>{
    const reqConfig={
        method:httpRequest,
        url,
        data:reqBody,
        headers:reqHeader?reqHeader:{ "Content-Type": "application/json" }
    }
    try{
       const response=await axios(reqConfig);
       return response;
    }catch(err){
        return(err);
    }
}