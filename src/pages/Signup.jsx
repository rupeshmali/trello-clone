import { Button, Center, Container, Flex, PasswordInput, Text, TextInput, Title } from '@mantine/core'
import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../config/fire'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/authentication/auth';
// import { AuthContext } from '../contexts/authentication/auth';

const Signup = () => {
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            }
        })
    }, [])

    const { register, login } = useContext(AuthContext);
    const handleRegister = () => {
        const isSuccess = register(registerEmail, registerPassword);
        navigate('/login');
    }

    return (
        <>
            <Center>
                <Container w={300} pt={100}>
                    <Flex direction={'column'} gap={20}>
                        <Title order={1}>Sign up</Title>
                        <TextInput
                            label="Email"
                            withAsterisk
                            placeholder='enter your email...'
                            onChange={(e) => {
                                setRegisterEmail(e.target.value);
                            }}
                        />
                        <PasswordInput
                            label="Password"
                            withAsterisk
                            placeholder='enter your password...'
                            onChange={(e) => {
                                setRegisterPassword(e.target.value);
                            }}
                        />
                        <Button onClick={handleRegister}>Register</Button>
                    </Flex>

                </Container>
            </Center>
        </>
    )
}

export default Signup