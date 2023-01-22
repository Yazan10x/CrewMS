import * as React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Center,
  Container,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Modal,
  useToast,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberDecrementStepper,
  HStack,
  Spacer,
  Stack,
  CheckboxGroup,
  Checkbox,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Health } from "../../Models/Health";
import { HealthsAPI } from "../../APIs/HealthsAPI";
import { ObjectID } from "bson";

interface Props {
  initialRef: any;
  finalRef: any;
  isOpen: any;
  onClose: any;
}

export const HealthModalPopUp = ({
  initialRef,
  finalRef,
  isOpen,
  onClose,
}: Props) => {
  const toast = useToast();
  const [loading, set_loading] = React.useState<boolean>(false);

  const [health, set_health] = React.useState<Health>({
    _id: new ObjectID(),
    user_id: "",
    bpm: 0,
    blood_pressure: 0,
    blood_oxygen: 0,
    temperature: 0,
    timestamp: new Date(),
    weight: 0,
    symptoms: "",
    hygiene: [],
    workspace: {},
    diet: 0,
    rest: 0,
    mental_health: {},
  });

  const required_info = () => {
    return (
      health.user_id !== "" &&
      health.bpm !== 0 &&
      health.blood_pressure !== 0 &&
      health.blood_oxygen !== 0 &&
      health.temperature !== 0 &&
      health.timestamp !== new Date() &&
      health.weight !== 0 &&
      //health.symptoms !== "" &&
      health.hygiene.length !== 0 &&
      //health.workspace !== {} &&
      health.diet !== 0 &&
      health.rest !== 0 &&
      health.mental_health.size !== 0
    );
  };

  const create = () => {
    if (required_info()) {
      set_loading(true);
      HealthsAPI.create_health_rec(health)
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          set_loading(false);
          cancel();
        });
    } else {
      toast({
        title: "Error.",
        description: "Please fill in all the required information",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const cancel = () => {
    set_health({
      _id: new ObjectID(),
      user_id: "",
      bpm: 0,
      blood_pressure: 0,
      blood_oxygen: 0,
      temperature: 0,
      timestamp: new Date(),
      weight: 0,
      symptoms: "",
      hygiene: [],
      workspace: {},
      diet: 0,
      rest: 0,
      mental_health: {},
    });
    onClose();
  };

  const [sliderValue, setSliderValue] = React.useState(5);
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <Container>
      <Center>
        <Box>
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
            size="3xl"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Complete Your Weekly Check-In!</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Stack>
                  <FormControl>
                    <FormLabel>Member</FormLabel>
                    <Input ref={initialRef} placeholder="First & Last Name" />
                  </FormControl>
                  <Spacer></Spacer>
                  <HStack>
                    <FormControl>
                      <FormLabel mt={4}>BPM(beats/min)</FormLabel>
                      <NumberInput defaultValue={80} min={0} max={200}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>

                    <FormControl>
                      <FormLabel mt={4}>Blood Pressure(mmHg)</FormLabel>
                      <NumberInput defaultValue={100} min={0} max={300}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>

                    <FormControl>
                      <FormLabel mt={4}>Blood Oxygen(%)</FormLabel>
                      <NumberInput defaultValue={97} min={0} max={100}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                  </HStack>

                  <Spacer></Spacer>
                  <HStack>
                    <FormControl>
                      <FormLabel mt={4}>Temperature(C)</FormLabel>
                      <NumberInput defaultValue={24.3} min={-30.0} max={300.0}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>

                    <FormControl>
                      <FormLabel mt={4}>Time</FormLabel>
                      <Input
                        placeholder="Select Date and Time"
                        size="md"
                        type="datetime-local"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel mt={4}>Weight(lbs)</FormLabel>
                      <NumberInput defaultValue={210.5} min={30.0} max={400.0}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                  </HStack>

                  <FormControl>
                    <FormLabel mt={4}>Symptoms Check</FormLabel>
                    <Input
                      ref={finalRef}
                      placeholder="Coughing, sore muscles and etc. Be as detailed as you can be as this is important to analyze you health."
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel mt={4}>Hygiene Check</FormLabel>
                    <CheckboxGroup
                      colorScheme="cyan"
                      defaultValue={["handHygiene", "shower"]}
                    >
                      <Stack spacing={[1, 4]} direction={["column", "row"]}>
                        <Checkbox value="handHygiene">Hand Hygiene</Checkbox>
                        <Checkbox value="visualCheck">Visual Check</Checkbox>
                        <Checkbox value="shower">Shower</Checkbox>
                        <Checkbox value="odourHygiene">Odour Hygiene</Checkbox>
                        <Checkbox value="oralHygiene">
                          Oral Hygiene(i.e. brushing teeth, rinsing)
                        </Checkbox>
                      </Stack>
                    </CheckboxGroup>
                  </FormControl>

                  <FormControl>
                    <FormLabel mt={4}>Workspace Check</FormLabel>
                    <Text>Organization</Text>
                    <Stack spacing={[1, 4]} direction={["column", "row"]}>
                      <Slider
                        id="slider"
                        defaultValue={5}
                        min={0}
                        max={10}
                        colorScheme="teal"
                        onChange={(v) => setSliderValue(v)}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                      >
                        <SliderMark value={1} mt="1" ml="-1.5" fontSize="sm">
                          1
                        </SliderMark>
                        <SliderMark value={2} mt="1" ml="-1.5" fontSize="sm">
                          2
                        </SliderMark>
                        <SliderMark value={3} mt="1" ml="-1.5" fontSize="sm">
                          3
                        </SliderMark>
                        <SliderMark value={4} mt="1" ml="-1.5" fontSize="sm">
                          4
                        </SliderMark>
                        <SliderMark value={5} mt="1" ml="-1.5" fontSize="sm">
                          5
                        </SliderMark>
                        <SliderMark value={6} mt="1" ml="-1.5" fontSize="sm">
                          6
                        </SliderMark>
                        <SliderMark value={7} mt="1" ml="-1.5" fontSize="sm">
                          7
                        </SliderMark>
                        <SliderMark value={8} mt="1" ml="-1.5" fontSize="sm">
                          8
                        </SliderMark>
                        <SliderMark value={9} mt="1" ml="-1.5" fontSize="sm">
                          9
                        </SliderMark>
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <Tooltip
                          hasArrow
                          bg="teal.500"
                          color="white"
                          placement="top"
                          isOpen={showTooltip}
                          label={`${sliderValue}`}
                        >
                          <SliderThumb />
                        </Tooltip>
                      </Slider>
                    </Stack>
                  </FormControl>
                  <FormControl>
                    <Text mt="3">Cleanliness</Text>
                    <Stack spacing={[1, 4]} direction={["column", "row"]}>
                      <Slider
                        id="slider"
                        defaultValue={5}
                        min={0}
                        max={10}
                        colorScheme="blue"
                        onChange={(v) => setSliderValue(v)}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                      >
                        <SliderMark value={1} mt="1" ml="-1.5" fontSize="sm">
                          1
                        </SliderMark>
                        <SliderMark value={2} mt="1" ml="-1.5" fontSize="sm">
                          2
                        </SliderMark>
                        <SliderMark value={3} mt="1" ml="-1.5" fontSize="sm">
                          3
                        </SliderMark>
                        <SliderMark value={4} mt="1" ml="-1.5" fontSize="sm">
                          4
                        </SliderMark>
                        <SliderMark value={5} mt="1" ml="-1.5" fontSize="sm">
                          5
                        </SliderMark>
                        <SliderMark value={6} mt="1" ml="-1.5" fontSize="sm">
                          6
                        </SliderMark>
                        <SliderMark value={7} mt="1" ml="-1.5" fontSize="sm">
                          7
                        </SliderMark>
                        <SliderMark value={8} mt="1" ml="-1.5" fontSize="sm">
                          8
                        </SliderMark>
                        <SliderMark value={9} mt="1" ml="-1.5" fontSize="sm">
                          9
                        </SliderMark>
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <Tooltip
                          hasArrow
                          bg="blue.500"
                          color="white"
                          placement="top"
                          isOpen={showTooltip}
                          label={`${sliderValue}`}
                        >
                          <SliderThumb />
                        </Tooltip>
                      </Slider>
                    </Stack>
                  </FormControl>
                  <Spacer></Spacer>
                  <HStack>
                    <FormControl>
                      <FormLabel mt={4}>Diet(Calories)</FormLabel>
                      <NumberInput
                        defaultValue={10000.0}
                        min={5000.0}
                        max={15000.0}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>

                    <FormControl>
                      <FormLabel mt={4}>Rest(#hr of sleep)</FormLabel>
                      <NumberInput defaultValue={52.0} min={25.0} max={90.0}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                  </HStack>

                  <FormControl>
                    <FormLabel mt={4}>Mental Health Check</FormLabel>
                    <Text>
                      How would you rate your overall mental well-being this
                      week?
                    </Text>
                    <Stack spacing={[1, 4]} direction={["column", "row"]}>
                      <Slider
                        id="slider"
                        defaultValue={5}
                        min={0}
                        max={10}
                        colorScheme="green"
                        onChange={(v) => setSliderValue(v)}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                      >
                        <SliderMark value={1} mt="1" ml="-1.5" fontSize="sm">
                          1
                        </SliderMark>
                        <SliderMark value={2} mt="1" ml="-1.5" fontSize="sm">
                          2
                        </SliderMark>
                        <SliderMark value={3} mt="1" ml="-1.5" fontSize="sm">
                          3
                        </SliderMark>
                        <SliderMark value={4} mt="1" ml="-1.5" fontSize="sm">
                          4
                        </SliderMark>
                        <SliderMark value={5} mt="1" ml="-1.5" fontSize="sm">
                          5
                        </SliderMark>
                        <SliderMark value={6} mt="1" ml="-1.5" fontSize="sm">
                          6
                        </SliderMark>
                        <SliderMark value={7} mt="1" ml="-1.5" fontSize="sm">
                          7
                        </SliderMark>
                        <SliderMark value={8} mt="1" ml="-1.5" fontSize="sm">
                          8
                        </SliderMark>
                        <SliderMark value={9} mt="1" ml="-1.5" fontSize="sm">
                          9
                        </SliderMark>
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <Tooltip
                          hasArrow
                          bg="green.500"
                          color="white"
                          placement="top"
                          isOpen={showTooltip}
                          label={`${sliderValue}`}
                        >
                          <SliderThumb />
                        </Tooltip>
                      </Slider>
                    </Stack>

                    <Text mt="4">
                      How would you rate your level of stress this week?
                    </Text>
                    <Stack spacing={[1, 4]} direction={["column", "row"]}>
                      <Slider
                        id="slider"
                        defaultValue={5}
                        min={0}
                        max={10}
                        colorScheme="orange"
                        onChange={(v) => setSliderValue(v)}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                      >
                        <SliderMark value={1} mt="1" ml="-1.5" fontSize="sm">
                          1
                        </SliderMark>
                        <SliderMark value={2} mt="1" ml="-1.5" fontSize="sm">
                          2
                        </SliderMark>
                        <SliderMark value={3} mt="1" ml="-1.5" fontSize="sm">
                          3
                        </SliderMark>
                        <SliderMark value={4} mt="1" ml="-1.5" fontSize="sm">
                          4
                        </SliderMark>
                        <SliderMark value={5} mt="1" ml="-1.5" fontSize="sm">
                          5
                        </SliderMark>
                        <SliderMark value={6} mt="1" ml="-1.5" fontSize="sm">
                          6
                        </SliderMark>
                        <SliderMark value={7} mt="1" ml="-1.5" fontSize="sm">
                          7
                        </SliderMark>
                        <SliderMark value={8} mt="1" ml="-1.5" fontSize="sm">
                          8
                        </SliderMark>
                        <SliderMark value={9} mt="1" ml="-1.5" fontSize="sm">
                          9
                        </SliderMark>
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <Tooltip
                          hasArrow
                          bg="teal.500"
                          color="white"
                          placement="top"
                          isOpen={showTooltip}
                          label={`${sliderValue}`}
                        >
                          <SliderThumb />
                        </Tooltip>
                      </Slider>
                    </Stack>

                    <Text mt="4">
                      How would you rate your level of support from your
                      colleagues and management team?
                    </Text>
                    <Stack spacing={[1, 4]} direction={["column", "row"]}>
                      <Slider
                        id="slider"
                        defaultValue={5}
                        min={0}
                        max={10}
                        colorScheme="red"
                        onChange={(v) => setSliderValue(v)}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                      >
                        <SliderMark value={1} mt="1" ml="-1.5" fontSize="sm">
                          1
                        </SliderMark>
                        <SliderMark value={2} mt="1" ml="-1.5" fontSize="sm">
                          2
                        </SliderMark>
                        <SliderMark value={3} mt="1" ml="-1.5" fontSize="sm">
                          3
                        </SliderMark>
                        <SliderMark value={4} mt="1" ml="-1.5" fontSize="sm">
                          4
                        </SliderMark>
                        <SliderMark value={5} mt="1" ml="-1.5" fontSize="sm">
                          5
                        </SliderMark>
                        <SliderMark value={6} mt="1" ml="-1.5" fontSize="sm">
                          6
                        </SliderMark>
                        <SliderMark value={7} mt="1" ml="-1.5" fontSize="sm">
                          7
                        </SliderMark>
                        <SliderMark value={8} mt="1" ml="-1.5" fontSize="sm">
                          8
                        </SliderMark>
                        <SliderMark value={9} mt="1" ml="-1.5" fontSize="sm">
                          9
                        </SliderMark>
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <Tooltip
                          hasArrow
                          bg="teal.500"
                          color="white"
                          placement="top"
                          isOpen={showTooltip}
                          label={`${sliderValue}`}
                        >
                          <SliderThumb />
                        </Tooltip>
                      </Slider>
                    </Stack>

                    <Text mt="4">
                      How would you rate your level of depression this week?
                    </Text>
                    <Stack spacing={[1, 4]} direction={["column", "row"]}>
                      <Slider
                        id="slider"
                        defaultValue={5}
                        min={0}
                        max={10}
                        colorScheme="gray"
                        onChange={(v) => setSliderValue(v)}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                      >
                        <SliderMark value={1} mt="1" ml="-1.5" fontSize="sm">
                          1
                        </SliderMark>
                        <SliderMark value={2} mt="1" ml="-1.5" fontSize="sm">
                          2
                        </SliderMark>
                        <SliderMark value={3} mt="1" ml="-1.5" fontSize="sm">
                          3
                        </SliderMark>
                        <SliderMark value={4} mt="1" ml="-1.5" fontSize="sm">
                          4
                        </SliderMark>
                        <SliderMark value={5} mt="1" ml="-1.5" fontSize="sm">
                          5
                        </SliderMark>
                        <SliderMark value={6} mt="1" ml="-1.5" fontSize="sm">
                          6
                        </SliderMark>
                        <SliderMark value={7} mt="1" ml="-1.5" fontSize="sm">
                          7
                        </SliderMark>
                        <SliderMark value={8} mt="1" ml="-1.5" fontSize="sm">
                          8
                        </SliderMark>
                        <SliderMark value={9} mt="1" ml="-1.5" fontSize="sm">
                          9
                        </SliderMark>
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <Tooltip
                          hasArrow
                          bg="teal.500"
                          color="white"
                          placement="top"
                          isOpen={showTooltip}
                          label={`${sliderValue}`}
                        >
                          <SliderThumb />
                        </Tooltip>
                      </Slider>
                    </Stack>
                    <Text mt="4">
                      How would you rate your overall level of happiness?
                    </Text>
                    <Stack spacing={[1, 4]} direction={["column", "row"]}>
                      <Slider
                        id="slider"
                        defaultValue={5}
                        min={0}
                        max={10}
                        colorScheme="yellow"
                        onChange={(v) => setSliderValue(v)}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                      >
                        <SliderMark value={1} mt="1" ml="-1.5" fontSize="sm">
                          1
                        </SliderMark>
                        <SliderMark value={2} mt="1" ml="-1.5" fontSize="sm">
                          2
                        </SliderMark>
                        <SliderMark value={3} mt="1" ml="-1.5" fontSize="sm">
                          3
                        </SliderMark>
                        <SliderMark value={4} mt="1" ml="-1.5" fontSize="sm">
                          4
                        </SliderMark>
                        <SliderMark value={5} mt="1" ml="-1.5" fontSize="sm">
                          5
                        </SliderMark>
                        <SliderMark value={6} mt="1" ml="-1.5" fontSize="sm">
                          6
                        </SliderMark>
                        <SliderMark value={7} mt="1" ml="-1.5" fontSize="sm">
                          7
                        </SliderMark>
                        <SliderMark value={8} mt="1" ml="-1.5" fontSize="sm">
                          8
                        </SliderMark>
                        <SliderMark value={9} mt="1" ml="-1.5" fontSize="sm">
                          9
                        </SliderMark>
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <Tooltip
                          hasArrow
                          bg="teal.500"
                          color="white"
                          placement="top"
                          isOpen={showTooltip}
                          label={`${sliderValue}`}
                        >
                          <SliderThumb />
                        </Tooltip>
                      </Slider>
                    </Stack>

                    <Text mt="4">
                      How would you rate your level of mindfulness and presence
                      in the moment?
                    </Text>
                    <Stack spacing={[1, 4]} direction={["column", "row"]}>
                      <Slider
                        id="slider"
                        defaultValue={5}
                        min={0}
                        max={10}
                        colorScheme="blue"
                        onChange={(v) => setSliderValue(v)}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                      >
                        <SliderMark value={1} mt="1" ml="-1.5" fontSize="sm">
                          1
                        </SliderMark>
                        <SliderMark value={2} mt="1" ml="-1.5" fontSize="sm">
                          2
                        </SliderMark>
                        <SliderMark value={3} mt="1" ml="-1.5" fontSize="sm">
                          3
                        </SliderMark>
                        <SliderMark value={4} mt="1" ml="-1.5" fontSize="sm">
                          4
                        </SliderMark>
                        <SliderMark value={5} mt="1" ml="-1.5" fontSize="sm">
                          5
                        </SliderMark>
                        <SliderMark value={6} mt="1" ml="-1.5" fontSize="sm">
                          6
                        </SliderMark>
                        <SliderMark value={7} mt="1" ml="-1.5" fontSize="sm">
                          7
                        </SliderMark>
                        <SliderMark value={8} mt="1" ml="-1.5" fontSize="sm">
                          8
                        </SliderMark>
                        <SliderMark value={9} mt="1" ml="-1.5" fontSize="sm">
                          9
                        </SliderMark>
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <Tooltip
                          hasArrow
                          bg="teal.500"
                          color="white"
                          placement="top"
                          isOpen={showTooltip}
                          label={`${sliderValue}`}
                        >
                          <SliderThumb />
                        </Tooltip>
                      </Slider>
                    </Stack>
                  </FormControl>
                </Stack>
              </ModalBody>
              {/*-----------------------------------------------------------*/}
              <ModalFooter>
                <Button colorScheme="blue" mr={3}>
                  Submit
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Center>
    </Container>
  );
};
