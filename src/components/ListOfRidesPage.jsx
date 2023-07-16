import { useState, useEffect } from 'react';
import { Box, Flex, Heading, Text, Button } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

const ListOfRidesPage = () => {

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('TOKEN');
        if (!token) {
            navigate('/')
        }
    }, []);

  const [rides, setRides] = useState([]);
  const location = useLocation();
  const searchData = location.state ? location.state.searchData : [];

  const userId = localStorage.getItem('ID')
  const number = localStorage.getItem('NUMBER')

  useEffect(() => {
    setRides(searchData);
  }, [searchData]);

const bookRide = (rideId, departure, destination, date, seats) => {
    // return axios.post(`http://localhost:5000/booked/${rideId}/book`, { userId })
    return axios.post(`https://cheap-rides.onrender.com/booked/${rideId}/book`, { userId })
      .then((response) => {
        // Handle the successful booking
        console.log(response.data.message);
        console.log(response)
        console.log(rideId, departure, destination, date, seats)

        const message = `Hi, I want to book a ride from ${departure} to ${destination} on ${date}`;
        // const whatsappLink = `https://wa.me/+917467871678/?text=${encodeURIComponent(message)}`;
        const whatsappLink = `https://wa.me/+${number}/?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');

      })
      .catch((error) => {
        // Handle the booking error
        console.error(error);
      });
  };

  const handleBookRide = (rideId, departure, destination, date, seats) => {
    // Call the backend API to book the ride
    bookRide(rideId, departure, destination, date, seats)
      .then(() => {
        // we can Perform any necessary actions after successful booking
      })
      .catch((error) => console.error(error));
  };

  const handleGoToHomePage = () => {
    // Logic to navigate to the home page
    console.log('Navigate to the home page');
  };

  return (
    <>
    <Header/>
    <Box minHeight="100vh" py={20} px={4} bgGradient="linear(to-r, teal.500, cyan.500)">
      <Flex direction="column" align="center" maxW="600px" mx="auto" bg="white" borderRadius="lg" p={8} boxShadow="lg">
        <Heading as="h1" size="xl" mb={6} textAlign="center" color="teal.500">List of Rides</Heading>
        {rides.map((ride) => (
          <Box key={ride._id} p={4} borderWidth={1} borderColor="gray.200" borderRadius="md" mb={4}>
            {/* <Text fontSize="xl" fontWeight="bold">Car Name: {ride.carName}</Text> */}
            {/* <Text fontSize="lg">Driver Name: {ride.driverName}</Text> */}
            <Text fontSize="lg">Origin: {ride.departure}</Text>
            <Text fontSize="lg">Destination: {ride.destination}</Text>
            <Text fontSize="lg">Date: {ride.date}</Text>
            <Text fontSize="lg">Available Seats: {ride.seats}</Text>
            <Button
              colorScheme="teal"
              size="lg"
              mt={4}
              onClick={() => handleBookRide(ride._id,ride.departure,ride.destination,ride.date,ride.seats)}
              disabled={ride.seatsAvailable === 0}
            >
              {ride.seatsAvailable === 0 ? 'No Seats Available' : 'Book Ride'}
            </Button>
          </Box>
        ))}
        <Button
          colorScheme="teal"
          size="lg"
          mt={4}
          onClick={handleGoToHomePage}
        >
          Go to Home Page
        </Button>
      </Flex>
    </Box>
    </>
  );
};

export default ListOfRidesPage;