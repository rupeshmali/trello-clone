import React, { createContext, useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../config/fire'
import { doc, setDoc } from '@firebase/firestore';
import { Alert, Notification } from '@mantine/core';
export const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    const register = async (registerEmail, registerPassword) => {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            console.log({ user });
            console.log("Registerd !");

            await sendEmailVerification(user);

            console.log('Verification Email sent. Check your mail box.');
            alert('Verification Email sent. Check your mail box.');

            return true;
        } catch (err) {
            console.log("Error occured while register : ", err);
            return false;
        }
    }
    const login = async (loginEmail, loginPassword) => {
        try {
            const {user} = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            console.log("Email and Password is Correct ! Checking if email is verified...");
            return user;

        } catch (err) {
            console.log("Error occured while login : ", err);
            return false;
        }
    }
    const logout = async () => {
        try {
            await signOut(auth);
            console.log("Logged out !");
            return true;
        } catch (err) {
            console.log("Error occure while logout", err);
        }
    }
    const values = {
        register,
        login,
        logout,
        isUserLoggedIn,
        setIsUserLoggedIn
    }
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default auth