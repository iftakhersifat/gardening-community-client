import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from './Firebase';
export const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    console.log(user);
    
    const createUser =(email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const LogIn =(email, password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }

    // hold login info
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
        });
        return ()=>{
            unsubscribe();
        }
    },[])

    const authData ={
        user,
        setUser,

        createUser,
        LogIn,
    }
    return <AuthContext.Provider value={authData}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;