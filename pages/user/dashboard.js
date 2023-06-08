import React, { useEffect,useState} from "react";
import NavHeader from "./nav";
import { Text, Card, CardBody, Link, useToast, Box, Heading, Grid } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { FaUsers, FaWallet, FaGlobe, FaMoneyBillAlt, FaExchangeAlt } from "react-icons/fa";
import Cookies from "js-cookie";

export default function App() {
    const toast = useToast();
    const [user,setUser] = useState({});

    const handleCopy = () => {
        const referralLinkText = document.getElementById("referralLinkText");
        navigator.clipboard.writeText(referralLinkText.innerText);
        toast({ title: "Referral Link Copied", status: "success", duration: 1000, position: 'top' });
    };
       const getUserDetails = async () => {
        const res = await fetch("/api/user/dashboard", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: Cookies.get("username") }),
        });
        const data = await res.json();
        if (data.success) {
            setUser(data.user);
            console.log(data.user)
        }
        else {
            toast({ title: "Session Expired", status: "error", duration: 1000, position: 'top' });
            Cookies.remove("username");
            Cookies.remove("sessionId");
            router.push("/user/login");
        }
       };


    useEffect(() => {
getUserDetails();
    }, [])

    return (
        <NavHeader>
            <Text fontSize={'4xl'} fontWeight={'bold'} >Dashboard</Text>
            <Card>
                <CardBody>
                    <Text fontSize="xl" fontWeight={'bold'}>
                        Referral Link :{" "}
                        <Link href="#" color="green" fontWeight="semibold" id="referralLinkText">
                            https://sky-aditya.vercel.app/user/register?id={user.username}
                        </Link>
                        <CopyIcon ml={2} onClick={handleCopy} cursor="pointer" />
                    </Text>
                </CardBody>
            </Card>

            {/* // first row cards */}
            <Box>
                <Grid
                    templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
                    gap={4}
                >
                    <Box p={4}>
                        <Box
                            bgGradient="linear(to-r, #493240, #f09)"
                            borderRadius="10px"
                            color="white"
                            p={4}
                        >
                            <Box className="card-icon card-icon-large">
                                <FaUsers size={110} />

                            </Box>
                            <Box mb={4}>
                                <Heading as="h5" fontSize="md" mb={0}>
                                    Team
                                </Heading>
                            </Box>
                            <Box d="flex" alignItems="center" mb={2}>
                                <Box flex="1">
                                    <Heading as="h2" fontSize="xl" mb={0}>
                                        3,243
                                    </Heading>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box p={4}>
                        <Box
                            bgGradient="linear(to-r, #373b44, #4286f4)"
                            borderRadius="10px"
                            color="white"
                            p={4}
                        >
                            <Box className="card-icon card-icon-large">
                                <FaWallet size={110} />
                            </Box>
                            <Box mb={4}>
                                <Heading as="h5" fontSize="md" mb={0}>
                                    Wallet
                                </Heading>
                            </Box>
                            <Box d="flex" alignItems="center" mb={2}>
                                <Box flex="1">
                                    <Heading as="h2" fontSize="xl" mb={0}>
                                        {user.wallet}
                                    </Heading>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box p={4}>
                        <Box
                            bgGradient="linear(to-r, #373b44, #4286f4)"
                            borderRadius="10px"
                            color="white"
                            p={4}
                        >
                            <Box className="card-icon card-icon-large">
                                <FaWallet size={110} />
                            </Box>
                            <Box mb={4}>
                                <Heading as="h5" fontSize="md" mb={0}>
                                    Top Up Wallet
                                </Heading>
                            </Box>
                            <Box d="flex" alignItems="center" mb={2}>
                                <Box flex="1">
                                    <Heading as="h2" fontSize="xl" mb={0}>
                                        {user.topupWallet}
                                    </Heading>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box p={4}>
                        <Box
                            bgGradient="linear(to-r, #373b44, #4286f4)"
                            borderRadius="10px"
                            color="white"
                            p={4}
                        >
                            <Box className="card-icon card-icon-large">
                                <FaGlobe size={110} />
                            </Box>
                            <Box mb={4}>
                                <Heading as="h5" fontSize="md" mb={0}>
                                    Package
                                </Heading>
                            </Box>
                            <Box d="flex" alignItems="center" mb={2}>
                                <Box flex="1">
                                    <Heading as="h2" fontSize="xl" mb={0}>
                                        15.07k
                                    </Heading>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box p={4}>
                        <Box
                            bgGradient="linear(to-r, #373b44, #4286f4)"
                            borderRadius="10px"
                            color="white"
                            p={4}
                        >
                            <Box className="card-icon card-icon-large">
                                <FaGlobe size={110} />
                            </Box>
                            <Box mb={4}>
                                <Heading as="h5" fontSize="md" mb={0}>
                                    Direct Bussiness
                                </Heading>
                            </Box>
                            <Box d="flex" alignItems="center" mb={2}>
                                <Box flex="1">
                                    <Heading as="h2" fontSize="xl" mb={0}>
                                        15.07k
                                    </Heading>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                </Grid>
            </Box>

            {/*  second row cards */}
            <Text fontSize={'4xl'} fontWeight={'bold'} >Incomes</Text>
            <Box>
                <Grid
                    templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
                    gap={4}
                >
                    <Box p={4}>
                        <Box
                            bgGradient="linear(to-r, #493240, #f09)"
                            borderRadius="10px"
                            color="white"
                            p={4}
                        >
                            <Box className="card-icon card-icon-large">
                                <FaMoneyBillAlt size={110} />
                            </Box>
                            <Box mb={4}>
                                <Heading as="h5" fontSize="md" mb={0}>
                                    Daily Bonus
                                </Heading>
                            </Box>
                            <Box d="flex" alignItems="center" mb={2}>
                                <Box flex="1">
                                    <Heading as="h2" fontSize="xl" mb={0}>
                                        3,243
                                    </Heading>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box p={4}>
                        <Box
                            bgGradient="linear(to-r, #373b44, #4286f4)"
                            borderRadius="10px"
                            color="white"
                            p={4}
                        >
                            <Box className="card-icon card-icon-large">
                                <FaMoneyBillAlt size={110} />
                            </Box>
                            <Box mb={4}>
                                <Heading as="h5" fontSize="md" mb={0}>
                                    Direct Bonus
                                </Heading>
                            </Box>
                            <Box d="flex" alignItems="center" mb={2}>
                                <Box flex="1">
                                    <Heading as="h2" fontSize="xl" mb={0}>
                                        15.07k
                                    </Heading>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box p={4}>
                        <Box
                            bgGradient="linear(to-r, #373b44, #4286f4)"
                            borderRadius="10px"
                            color="white"
                            p={4}
                        >
                            <Box className="card-icon card-icon-large">
                                <FaMoneyBillAlt size={110} />
                            </Box>
                            <Box mb={4}>
                                <Heading as="h5" fontSize="md" mb={0}>
                                    Level Bonus
                                </Heading>
                            </Box>
                            <Box d="flex" alignItems="center" mb={2}>
                                <Box flex="1">
                                    <Heading as="h2" fontSize="xl" mb={0}>
                                        15.07k
                                    </Heading>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Box>

            {/*  third row cards */}
            <Text fontSize={'4xl'} fontWeight={'bold'} >In/Out's</Text>
            <Box>
                <Grid
                    templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
                    gap={4}
                >
                    <Box p={4}>
                        <Box
                            bgGradient="linear(to-r, #493240, #f09)"
                            borderRadius="10px"
                            color="white"
                            p={4}
                        >
                            <Box className="card-icon card-icon-large">
                                <FaExchangeAlt size={110} />
                            </Box>
                            <Box mb={4}>
                                <Heading as="h5" fontSize="md" mb={0}>
                                    Deposits
                                </Heading>
                            </Box>
                            <Box d="flex" alignItems="center" mb={2}>
                                <Box flex="1">
                                    <Heading as="h2" fontSize="xl" mb={0}>
                                        {user.deposits}
                                    </Heading>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box p={4}>
                        <Box
                            bgGradient="linear(to-r, #373b44, #4286f4)"
                            borderRadius="10px"
                            color="white"
                            p={4}
                        >
                            <Box className="card-icon card-icon-large">
                                <FaExchangeAlt size={110} />
                            </Box>
                            <Box mb={4}>
                                <Heading as="h5" fontSize="md" mb={0}>
                                    Withdrawal
                                </Heading>
                            </Box>
                            <Box d="flex" alignItems="center" mb={2}>
                                <Box flex="1">
                                    <Heading as="h2" fontSize="xl" mb={0}>
                                        15.07k
                                    </Heading>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Box>
        </NavHeader>
    );
}