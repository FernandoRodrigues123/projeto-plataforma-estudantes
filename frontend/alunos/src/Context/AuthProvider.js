import React, { createContext} from "react";

const Context = createContext();
const AuthProvider = ({children}) => {

    return(
        <Context.Provider>
            {children}
        </Context.Provider>
    )
}

export{Context, AuthProvider}