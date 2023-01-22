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
  size: any;
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
                      <FormLabel>BPM(beats/min)</FormLabel>
                      <NumberInput defaultValue={80} min={0} max={200}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Blood Pressure(mmHg)</FormLabel>
                      <NumberInput defaultValue={100} min={0} max={300}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Blood Oxygen(%)</FormLabel>
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
                      <FormLabel>Temperature(C)</FormLabel>
                      <NumberInput defaultValue={24.3} min={-30.0} max={300.0}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Time</FormLabel>
                      <Input
                        placeholder="Select Date and Time"
                        size="md"
                        type="datetime-local"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Weight(lbs)</FormLabel>
                      <NumberInput defaultValue={210.5} min={30.0} max={400.0}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                  </HStack>
                  <Spacer></Spacer>

                  <FormControl mt={4}>
                    <FormLabel>Symptoms Check</FormLabel>
                    <Input
                      ref={finalRef}
                      placeholder="Coughing, sore muscles and etc. Be as detailed as you can be as this is important to analyze you health."
                    />
                  </FormControl>

                  <FormControl mt={5}>
                    <FormLabel>Hygiene Check</FormLabel>
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

                  <FormControl mt={4}>
                    <FormLabel>Workspace Check</FormLabel>
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

                      <Text mt = '3'>Cleanliness</Text>
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
                      <FormLabel>Diet(Calories)</FormLabel>
                      <NumberInput defaultValue={10000.0} min={5000.0} max={15000.0}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                  </FormControl>

                  <FormControl>
                      <FormLabel>Rest(#hr of sleep)</FormLabel>
                      <NumberInput defaultValue={10000.0} min={5000.0} max={15000.0}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                  </FormControl>

                </Stack>
              </ModalBody>

              {/*    oid: ObjectId
user_id: str
bpm: float
blood_pressure: float
blood_oxygen: float
temperature: float
timestamp: datetime
weight: float
symptoms: str
hygiene: list[str]
workspace: dict[str, int]
diet: float
rest: int
mental_health: dict[str, int]*/}
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
