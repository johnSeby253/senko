/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react"

export const TokenAuthContextAgent = createContext()

const TokenAgent = ( {children}) => {
    const [isAuthorizedAgent, setIsAuthorizedAgent] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem('agentToken')) {
            setIsAuthorizedAgent(true)
        } else {
            setIsAuthorizedAgent(false)
        }
    }, [isAuthorizedAgent])
  return (
    <div>
         <TokenAuthContextAgent.Provider value={{ isAuthorizedAgent, setIsAuthorizedAgent }}>
                {children}
            </TokenAuthContextAgent.Provider>
    </div>
  )
}

export default TokenAgent
