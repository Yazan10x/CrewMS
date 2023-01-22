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
import GridBlurredBackdrop from "../Home/Purpose"
import * as React from "react";
import { IncidentTable } from './IncidentTable';

export const IncidentReport = () => {
  return (
    <>
      <header>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
        <title>Incident Report</title>
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
            Incident <br />
            <Text as={'span'} color={'green.400'}>
              Report
            </Text>
          </Heading>
          <IncidentTable></IncidentTable>
        </Stack>
      </Container>
    </>
  );
}
