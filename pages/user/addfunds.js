import {
    Flex,
    Stack,
    Heading,
    Text,
    Input,
    Button,
    Icon,
    useColorModeValue,
    useToast
} from '@chakra-ui/react';
import NavHeader from './nav';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { LockIcon } from '@chakra-ui/icons';

export default function CardWithIllustration() {
    const toast = useToast();
    const [amount, setAmount] = useState(0);

    const handleFunds = async (e) => {
        if (amount <= 0) {
            alert("Enter a valid amount")
            return;
        }
        try {
            const res = await fetch('/api/user/addFunds', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: Cookies.get("username"), amount: amount })
            });
            const data = await res.json();
            console.log(data);
            if (res.status === 200) {
                return toast({ title: "Funds added", description: "Funds added to wallet", status: "success", duration: 3000, isClosable: true, position: "top-center" })
            }
            else {
                alert("User not found")
            }

        } catch (error) {
            console.log(error.message)
            return toast({ title: "Error", description: "Error adding funds", status: "error", duration: 3000, isClosable: true, position: "top-center" })
        }
    };


    return (
        <NavHeader>
            <Flex
                minH={'100vh'}
                align={'start'}
                justify={'center'}
                py={12}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack
                    boxShadow={'2xl'}
                    bg={useColorModeValue('white', 'gray.700')}
                    rounded={'xl'}
                    p={10}
                    spacing={8}
                    align={'center'}>
                    <Icon as={LockIcon} w={24} h={24} />
                    <Stack align={'center'} spacing={2}>
                        <Heading
                            textTransform={'uppercase'}
                            fontSize={'3xl'}
                            color={useColorModeValue('gray.800', 'gray.200')}>
                            Add Funds
                        </Heading>
                        <Text fontSize={'lg'} color={'gray.500'}>
                            Add funds to your wallet
                        </Text>
                    </Stack>
                    <Stack spacing={4} direction={{ base: 'column', md: 'row' }} w={'full'}>
                        <Input
                            type={'number'}
                            placeholder={'john@doe.net'}
                            color={useColorModeValue('gray.800', 'gray.200')}
                            bg={useColorModeValue('gray.100', 'gray.600')}
                            rounded={'full'}
                            value={amount}
                            onChange={(e) => { setAmount(e.target.value) }}
                            name="amount"
                            border={0}
                            _focus={{
                                bg: useColorModeValue('gray.200', 'gray.800'),
                                outline: 'none',
                            }}
                        />
                        <Button
                            bg={'blue.400'}
                            rounded={'full'}
                            onClick={(e) => { handleFunds(e) }}
                            color={'white'}
                            flex={'1 0 auto'}
                            _hover={{ bg: 'blue.500' }}
                            _focus={{ bg: 'blue.500' }}>
                            Add
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
        </NavHeader>
    );
}

