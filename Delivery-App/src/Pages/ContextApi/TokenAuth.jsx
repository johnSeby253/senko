/* eslint-disable react/prop-types */
import {  createContext, useEffect, useState } from "react"

export const TokenAuthContextUser = createContext()

const TokenAuth = ({ children }) => {
    const [isAuthorizedUser, setIsAuthorizedUser] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setIsAuthorizedUser(true)
        } else {
            setIsAuthorizedUser(false)
        }
    }, [])
    return (
        <div>
            <TokenAuthContextUser.Provider value={{ isAuthorizedUser, setIsAuthorizedUser }}>
                {children}
            </TokenAuthContextUser.Provider>
        </div>
    )
}

export default TokenAuth
