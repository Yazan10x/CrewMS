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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl, FormLabel, Input, useDisclosure,
} from "@chakra-ui/react";
// import { CUIAutoComplete } from 'chakra-ui-autocomplete'
import { FaDiscord, FaGithub } from "react-icons/all";
import * as React from "react";
import {HealthModalPopUp} from "./HealthModalPopUp";



export const HealthReport = () => {
  // Used for the modal popup
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  // used for size of modal
  const [size, setSize] = React.useState('xl')

  // used for when button is clicked to open modal popup and set size of modal popup to full
  const handleSizeClick = (newSize: React.SetStateAction<string>) => {
    setSize(newSize)
    onOpen()
  }

  // @ts-ignore
  return (
    <>
      <header>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
        <title>Health Report</title>
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
            Complete Your
            <br />
            <Text as={"span"} color={"cyan.400"}>
              Daily Check-In!
            </Text>
          </Heading>
          <Text
            color={"black.400"}
            fontWeight={200}
            fontSize={{ base: "1xl" }}
            lineHeight={"120%"}
            // px={{ base: 10, md: -90 }}
          >
            Completing your daily health check is an important aspect of taking
            care of yourself and maintaining your overall well-being. It is a
            simple yet effective way to reflect on your physical, mental and
            spiritual health. Through this daily reflection, you can identify
            any areas of concern and take the necessary steps to address them.
            By taking the time to complete your daily health check, you can
            ensure that you are staying on top of your health and making the
            necessary changes to maintain a healthy and balanced lifestyle.
            Regularly reflecting on your physical, mental, and spiritual health
            can help you maintain a sense of balance, stability, and well-being
            that is vital to your overall health. By completing your daily
            health check, you can ensure that you are taking the right steps to
            stay healthy and happy.
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
              <Button
              colorScheme={"cyan"}
              bg={"cyan.400"}
              rounded={"full"}
              px={6}
              _hover={{
                bg: "cyan.500",
              }}
              onClick={() => handleSizeClick(size)}
            >
              Check-In
            </Button>

            <HealthModalPopUp
                initialRef={initialRef}
                finalRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
                size='3xl'/>

          </Stack>
        </Stack>
      </Container>
    </>
  );
};
