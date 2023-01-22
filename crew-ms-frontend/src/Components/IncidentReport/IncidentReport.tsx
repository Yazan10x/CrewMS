import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  Link,
  Avatar,
  chakra,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import { FaDiscord, FaGithub } from "react-icons/all";
import * as React from "react";
import { IncidentTable } from "./IncidentTable";

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

      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Incident <br />
            <Text as={"span"} color={"cyan.400"}>
              Report!
            </Text>
          </Heading>
          <Text
            color={"black.400"}
            fontWeight={200}
            fontSize={{ base: "1xl" }}
            lineHeight={"120%"}
            // px={{ base: 10, md: -90 }}
          >
            Submitting a valid and honest incident report is crucial for the
            safety of yourself and your crew. It helps the management identify
            any potential hazards and take action to prevent them from happening
            again. By being honest and providing accurate information, you're
            helping to keep everyone safe and secure. It's important to take the
            time to submit a thorough report if an incident occurs.
          </Text>
          <IncidentTable></IncidentTable>
        </Stack>
      </Container>
    </>
  );
};
