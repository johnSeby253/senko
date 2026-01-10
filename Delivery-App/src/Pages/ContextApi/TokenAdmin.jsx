/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { createContext, useEffect, useState } from "react";

export const TokenAuthContextAdmin = createContext()
const TokenAdmin = ({children}) => {
    const [isAuthorizedAdmin, setIsAuthorizedAdmin] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem('adminToken')) {
            setIsAuthorizedAdmin(true)
        } else {
            setIsAuthorizedAdmin(false)
        }
    }, [isAuthorizedAdmin]);

  return (
    <div>
       <TokenAuthContextAdmin.Provider value={{ isAuthorizedAdmin, setIsAuthorizedAdmin }}>
                {children}
            </TokenAuthContextAdmin.Provider>
    </div>
  )
}

export default TokenAdmin
