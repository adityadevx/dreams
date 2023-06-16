import {
    Flex, Box, FormControl, FormLabel, Input, InputGroup, HStack, InputRightElement, Stack, Button, Heading, Text, useColorModeValue, Link, Checkbox, Select, FormHelperText, useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';


const country_list = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

export default function SignupCard() {
    const router = useRouter();
    const toast = useToast();
    const [submitBtnLoading, setSubmitBtnLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formDetails, setFormDetails] = useState({ firstName: '', lastName: '', email: '', telephone: '', username: '', country: '', wallet: 0, topupWallet: 0, deposits: 0, withdrawals: 0, password: '', referralId: '', sessionId: '' })

    const { firstName, lastName, email, telephone, username, country, wallet, topupWallet, deposits, withdrawals, password, referralId } = formDetails;

    const handleOnChange = (e) => {
        setFormDetails({ ...formDetails, [e.target.name]: e.target.value })
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setSubmitBtnLoading(true);
        if (firstName === '' || email === '' || password === '' || telephone === '' || username === '' || country == '') {
            setSubmitBtnLoading(false);
            return toast({ title: "Please fill all fields", status: "error", position: 'top', duration: 3000, })
        }

        try {
            const res = await fetch('/api/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formDetails)
            });
            const data = await res.json();
            console.log(data);
            if (res.status === 200) {
                setSubmitBtnLoading(false);
                router.push('/user/login');
            }
            if (res.status === 400) {
                setSubmitBtnLoading(false);
                return toast({ title: data.message, status: "error", position: 'top', duration: 3000, })
            }

        } catch (error) {
            console.log(error.message);
            setSubmitBtnLoading(false);
        }
    }



    return (
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
                        Sign Up to create your account
                    </Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <HStack>
                            <Box>
                                <FormControl id="firstName" isRequired>
                                    <FormLabel>First Name</FormLabel>
                                    <Input type="text" onChange={e => handleOnChange(e)} value={firstName} name='firstName' />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="lastName">
                                    <FormLabel>Last Name</FormLabel>
                                    <Input type="text" onChange={e => handleOnChange(e)} value={lastName} name='lastName' />
                                </FormControl>
                            </Box>
                        </HStack>
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
                        <HStack>
                            <Box>
                                <FormControl id="telephone" isRequired>
                                    <FormLabel>Mobile Number</FormLabel>
                                    <Input type="tel" name='telephone' value={telephone} onChange={e => handleOnChange(e)} />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="referral" >
                                    <FormLabel>Referral Id</FormLabel>
                                    <Input type="text" onChange={e => handleOnChange(e)} value={referralId} name='referralId' />
                                </FormControl>
                            </Box>
                        </HStack>
                        <HStack>
                            <Box>
                                <FormControl id="username" isRequired>
                                    <FormLabel>Username</FormLabel>
                                    <Input type="text" onChange={e => handleOnChange(e)} value={username} name='username' />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="country" isRequired>
                                    <FormLabel>Country</FormLabel>
                                    <Select onChange={(e) => setFormDetails({ ...formDetails, country: e.target.value })} >
                                        {
                                            country_list.map((country) => {
                                                return (<option value={country} key={country} >{country}</option>)
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                        </HStack>
                        <Stack spacing={6}>
                            <Checkbox>I agree to the <Link color={'blue.400'}>terms & conditions</Link> </Checkbox>
                        </Stack>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                isLoading={submitBtnLoading}
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                type='submit'
                                onClick={e => handleOnSubmit(e)}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Already a user? <Link color={'blue.400'} onClick={() => { router.push('/user/login') }}  >Login</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}