import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [user,setUser] = useState(null);
    const [ready,setReady] = useState(false);

    useEffect(()=> {
        if(!user){
            axios.get("/profile").then(({data}) => {
                setUser(data);
            }).catch(error => {
                console.error('Error fetching user:', error);
              })
              .finally(() => {
                setReady(true);
              });
        }
    }, [user])
    return (
        <UserContext.Provider value={{user, setUser, ready}}>
            {children}
        </UserContext.Provider>
    );
};
