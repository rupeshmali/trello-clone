import { Button, Center, Container, Flex, PasswordInput, Space, TextInput, Title } from '@mantine/core'
import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../config/fire'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/authentication/auth';


const Login = () => {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const { login,setIsUserLoggedIn } = useContext(AuthContext);

   
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                console.log({currentUser});
                setUser(currentUser);
            }
        })
    }, [])

    const handleLogin = async () => {
        const returnedUser = await login(loginEmail, loginPassword);
        console.log({returnedUser});
        console.log("user.emailVerified : ", returnedUser.emailVerified);
        if (returnedUser.emailVerified) {
            // setShowAppshell(true);
            console.log("User's email is verified... Logging in...");
            setIsUserLoggedIn(true);
            navigate('/home');
        }
        else {
            console.log("User's email is not verified ! Please verify from your mailbox !");
            alert(" Your email is not verified ! Please verify email from your mailbox !");
        }
    }

    return (
        <Center>
            <Flex direction={'column'} gap={20} miw={300}>
                <Space py={50} />

                <Title order={1}>Log in</Title>
                <TextInput
                    label="Email"
                    withAsterisk
                    placeholder='enter your email...'
                    onChange={(e) => {
                        setLoginEmail(e.target.value);
                    }}
                />
                <PasswordInput
                    label="Password"
                    withAsterisk
                    placeholder='enter your password...'
                    onChange={(e) => {
                        setLoginPassword(e.target.value);
                    }}
                />
                <Button onClick={handleLogin}>Log in</Button>
                <Button color='green' onClick={() => { navigate('/signup'); }}>Create new account</Button>
            </Flex>
        </Center>
    )
}

export default Login