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
  SimpleGrid, Spacer, VStack, StackDivider,
} from '@chakra-ui/react';
import {FaDiscord, FaGithub} from "react-icons/all";
import {Purpose} from "./Purpose"
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
        <VStack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Join Our Crewsise <br />
            <Text as={'span'} color={'cyan.400'}>
              Let's explore together!
            </Text>
          </Heading>
          <Spacer></Spacer>
        <VStack>
          <Text color={'gray.500'}>
            <Heading>
              About us
            </Heading>
            <Text>
              We believe that everyone should be able to explore the world around them as
              it is an opportunity to learn. But unfortunately, exploration can affect us in
              other ways. Hence we made Crewise, which is an application that will always be by
              your side. We allow crew members to file reports if the need ever occurs and we check in
              on you and your crew everyday to make sure everyone is doing all right.
            </Text>
          </Text>
        </VStack>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            {Purpose()}
          </Stack>
        </VStack>
      </Container>
    </>
  );
}
