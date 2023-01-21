import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon, Link,
      Avatar,
  chakra,
  Flex,
  SimpleGrid,
} from '@chakra-ui/react';
import {FaDiscord, FaGithub} from "react-icons/all";
import GridBlurredBackdrop from "./Purpose"
import * as React from "react";

export const Home = () => {
  return (
    <>
      <header>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
        <title>Home</title>
      </header>

      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Join Our Crew <br />
            <Text as={'span'} color={'green.400'}>
              UofT's Crew!
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            Crew Page
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            <Button
              isDisabled
              colorScheme={'green'}
              bg={'green.400'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'green.500',
              }}>
              Sign In
            </Button>
            {GridBlurredBackdrop()}
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
