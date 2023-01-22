import * as React from "react"
import { Box, Heading, Text, Button, Center, Container } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const NotFoundDoctor = () => {
    let navigate = useNavigate()

    const handle_home = () => {
        navigate("/doctor");
    }

  return (
      <Container>
      <Center>
        <Box textAlign="center" py={10} px={6}>
        <Heading
            display="inline-block"
            as="h2"
            size="2xl"
            bgGradient="linear(to-r, teal.400, teal.600)"
            backgroundClip="text">
            404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
            Doctor Page Not Found
        </Text>
        <Text color={'gray.500'} mb={6}>
            The page you're looking for does not seem to exist
        </Text>

        <Button
            colorScheme="teal"
            bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
            color="white"
            variant="solid"
            onClick={handle_home}
            >
            Go to Doctor Home Page
        </Button>
        </Box>
    </Center>
    </Container>
  );
}
