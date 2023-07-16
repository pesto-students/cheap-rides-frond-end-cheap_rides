import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Flex, Heading, Input, Button, Alert, AlertIcon } from '@chakra-ui/react';
import axios from 'axios';
import Header from './Header';

const OfferRidePage = () => {

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('TOKEN');
        if (!token) {
            navigate('/')
        }
    }, []);

    const [departure, setDeparture] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [seats, setSeats] = useState('');
    const [carName, setCarName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const phoneNumber = localStorage.getItem('NUMBER');

    const handleOfferRide = async () => {
        try {
            if (!departure || !destination || !date || !seats || !carName) {
                setError('Please fill in all fields');
                return;
            }

            // const response = await axios.post('http://localhost:5000/offers', {
            const response = await axios.post('https://cheap-rides.onrender.com/offers', {
                departure,
                destination,
                date,
                seats: Number(seats),
                phoneNumber,
                carName,
            });

            if (response.status === 201) {
                setSuccess('Ride created successfully');
                setDeparture('');
                setDestination('');
                setDate('');
                setSeats('');
                setCarName('');
            }
        } catch (error) {
            console.error(error);
            setError('Failed to create ride');
        }
    };

    return (
        <>
            <Header />
            <Box minHeight="100vh" px={4} py={20} bgGradient="linear(to-r, teal.500, cyan.500)">
                <Flex
                    direction="column"
                    align="center"
                    maxW="600px"
                    mx="auto"
                    bg="white"
                    borderRadius="lg"
                    p={8}
                    boxShadow="lg"
                >
                    <Heading as="h1" size="xl" mb={6} textAlign="center" color="teal.500">
                        Offer a Ride
                    </Heading>
                    {error && (
                        <Alert status="error" mb={4}>
                            <AlertIcon />
                            {error}
                        </Alert>
                    )}
                    {success && (
                        <Alert status="success" mb={4}>
                            <AlertIcon />
                            {success}
                        </Alert>
                    )}
                    <Input
                        type="text"
                        placeholder="Departure"
                        mb={4}
                        borderRadius="md"
                        bg="gray.100"
                        _placeholder={{ color: 'gray.500' }}
                        value={departure}
                        onChange={(e) => setDeparture(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="Destination"
                        mb={4}
                        borderRadius="md"
                        bg="gray.100"
                        _placeholder={{ color: 'gray.500' }}
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                    />
                    <Input
                        type="date"
                        placeholder="Date"
                        mb={4}
                        borderRadius="md"
                        bg="gray.100"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <Input
                        type="number"
                        placeholder="Number of Seats"
                        mb={4}
                        borderRadius="md"
                        bg="gray.100"
                        value={seats}
                        onChange={(e) => setSeats(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="Car Name"
                        mb={6}
                        borderRadius="md"
                        bg="gray.100"
                        _placeholder={{ color: 'gray.500' }}
                        value={carName}
                        onChange={(e) => setCarName(e.target.value)}
                    />
                    <Button
                        colorScheme="teal"
                        size="lg"
                        mb={4}
                        width="100%"
                        _hover={{ bg: 'teal.600' }}
                        _focus={{ boxShadow: 'outline' }}
                        onClick={handleOfferRide}
                    >
                        Offer Ride
                    </Button>
                </Flex>
            </Box>
        </>
    );
};

export default OfferRidePage;
