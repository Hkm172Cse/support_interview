import { createContext, useState } from "react";
import app from "../firebase/firebase.config";
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth';
export const authorContext = createContext();
const auth = getAuth(app);
const AuthContext = ({children})=>{
    const [user, setUser] = useState("aziul hakim");
    
    const createUser = (email, pass)=>{
        return createUserWithEmailAndPassword(auth, email, pass);
    }

    const contextInfo = {user, createUser}; 
     return(
        <authorContext.Provider value={contextInfo}>
            {children}
        </authorContext.Provider>
     )

}
export default AuthContext;