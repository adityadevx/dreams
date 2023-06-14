import React from 'react'
import {
    Flex, Box, FormControl, FormLabel, Input, InputGroup, HStack, InputRightElement, Stack, Button, Heading, Text, useColorModeValue, Link, Checkbox, Select, FormHelperText, useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const login = () => {
    const toast = useToast();
    const router = useRouter();
    const [formDetails, setFormDetails] = useState({ email: '', password: '' })
    const [showPassword, setShowPassword] = useState(false);

    const { email, password } = formDetails;

    const handleOnChange = (e) => {
        setFormDetails({ ...formDetails, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(formDetails);
        if (email === '' || password === '') {
            return toast({
                title: "Error",
                description: "Please fill all fields",
                status: "error",
                duration: 3000,
                position: 'top'
            })
        }
        try {
            const res = await fetch('/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formDetails)
            });
            const data = await res.json();
            console.log(data);
            if (data.success) {
                toast({
                    title: "Success",
                    description: data.message,
                    status: "success",
                    duration: 3000,
                    position: 'top'
                })
                document.cookie = `username=${data.user}`;
                router.push('/user/dashboard');
            }
            else {
                toast({
                    title: "Error",
                    description: data.message,
                    status: "error",
                    duration: 3000,
                    position: 'top'
                })
            }

        } catch (error) {
            return toast({
                title: "Error",
                description: "Internal server error",
                status: "error",
                duration: 3000,
                position: 'top'
            })

        }
    }

    return (
        <>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        {/* <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading> */}
                        <Heading fontSize={'2xl'} color={'gray.600'}>
                            Login to your account
                        </Heading>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>

                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" onChange={e => handleOnChange(e)} value={email} name='email' />
                                <FormHelperText>We'll never share your email.</FormHelperText>
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input type={showPassword ? 'text' : 'password'} onChange={e => handleOnChange(e)} value={password} name='password' />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() =>
                                                setShowPassword((showPassword) => !showPassword)
                                            }>
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={'blue.400'}
                                    color={'white'}
                                    type='submit'
                                    onClick={e => handleLogin(e)}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Login
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Not A User <Link color={'blue.400'} onClick={() => { router.push('/user/register') }}>Sign Up</Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </>
    )
}

export default login