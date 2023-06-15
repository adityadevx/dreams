import {
    Box,
    Center,
    Text,
    Stack,
    List,
    ListItem,
    ListIcon,
    Button,
    useColorModeValue,
    Grid,
    Toast,
    useToast
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import NavHeader from './nav';
import Cookie from 'js-cookie';
import Cookies from 'js-cookie';
import Head from 'next/head';
import { useEffect } from 'react';
import {useRouter} from 'next/router';


const plans = [
    {
        name: 'Package 1',
        price: 5000,
        dailyBonus: '0.5%',
        totalReturn: '150%',
        duration: '30 days',
        referralBonus: '5%',
    },
    {
        name: 'Package 2',
        price: 10000,
        dailyBonus: '0.5%',
        totalReturn: '150%',
        duration: '30 days',
        referralBonus: '5%',
    },
    {
        name: 'Package 3',
        price: 20000,
        dailyBonus: '0.5%',
        totalReturn: '150%',
        duration: '30 days',
        referralBonus: '5%',
    },
    {
        name: 'Package 4',
        price: 50000,
        dailyBonus: '0.5%',
        totalReturn: '150%',
        duration: '30 days',
        referralBonus: '5%',
    },
    {
        name: 'Package 5',
        price: 100000,
        dailyBonus: '0.5%',
        totalReturn: '150%',
        duration: '30 days',
        referralBonus: '5%',
    }
];

export default function Pricing() {
    const toast = useToast();
    const router = useRouter();
    const verifySessionId = async () => {
        const response = await fetch('/api/user/sessionIdCheck', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: Cookie.get('username') }),
        });
        const data = await response.json();
        if(response.status == 200){
            console.log(data);
        }
        else{ 
            console.log(data);
            router.push('/user/login');
        }
    };
    

    useEffect(() => { 
        verifySessionId();
     }, [])
    

    return (
        <>
        <Head>
            <title>Staking</title>
        </Head>
        <NavHeader>
            <Grid
                templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
                gap={3}
                mx="auto"
                px={4}
            >
                {plans.map((plan, index) => (
                    <Card key={index} plan={plan} />
                ))}
            </Grid>
        </NavHeader>
        </>
    );
}

function Card({ plan }) {
    const toast = useToast();
    const handlePlan = async (plan) => {
        try {
            const planDetails = { ...plan, username: Cookie.get('username') }
            console.log(planDetails);
            const response = await fetch('/api/user/buyplan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    plan: planDetails,
                }),
            });
            const data = await response.json();
            console.log(data);

            if (response.status === 200) {
                return toast({
                    title: "Plan bought successfully",
                    description: "You will receive your daily bonus in your wallet",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: "top-center"
                })
            }

            else if (response.status === 400) {
                return toast({
                    title: "Insufficient balance",
                    description: "Please topup your wallet",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top-center"
                })
            }
        } catch (error) {
            console.log(error.message)
            alert('Something went wrong!')
        }
    };
    return (
        <Box
            maxW={'330px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'2xl'}
            rounded={'md'}
            overflow={'hidden'}
        >
            <Stack
                textAlign={'center'}
                p={3}
                color={useColorModeValue('gray.800', 'white')}
                align={'center'}
            >
                <Text
                    fontSize={'sm'}
                    fontWeight={500}
                    bg={useColorModeValue('green.50', 'green.900')}
                    p={2}
                    px={3}
                    color={'green.500'}
                    rounded={'full'}
                >
                    {plan.name}
                </Text>
                <Stack direction={'row'} align={'center'} justify={'center'}>
                    <Text fontSize={'3xl'}>₹</Text>
                    <Text fontSize={'5xl'} fontWeight={800}>
                        {plan.price}
                    </Text>
                    <Text color={'gray.800'}>INR</Text>
                </Stack>
            </Stack>

            <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
                <List spacing={3}>
                    <ListItem>
                        <ListIcon as={CheckIcon} color="green.400" />
                        {plan.dailyBonus} daily bonus
                    </ListItem>
                    <ListItem>
                        <ListIcon as={CheckIcon} color="green.400" />
                        {plan.totalReturn} total return
                    </ListItem>
                    <ListItem>
                        <ListIcon as={CheckIcon} color="green.400" />
                        {plan.duration} duration
                    </ListItem>
                    <ListItem>
                        <ListIcon as={CheckIcon} color="green.400" />
                        {plan.referralBonus} referral bonus
                    </ListItem>
                </List>

                <Button
                    mt={10}
                    w={'full'}
                    bg={'green.400'}
                    color={'white'}
                    rounded={'xl'}
                    boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                    _hover={{
                        bg: 'green.500',
                    }}
                    _focus={{
                        bg: 'green.500',
                    }}
                    onClick={() => { handlePlan(plan) }}
                >
                    Invest Now
                </Button>
            </Box>
        </Box>
    );
}
