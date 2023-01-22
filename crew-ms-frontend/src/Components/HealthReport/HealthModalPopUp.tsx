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
    NumberInputField, NumberDecrementStepper, HStack, Spacer, Stack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import {Health} from "../../Models/Health";
import {HealthsAPI} from "../../APIs/HealthsAPI";
import {ObjectID} from "bson";

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

    const toast = useToast()
    const [loading, set_loading] = React.useState<boolean>(false);

    const [health, set_health] = React.useState<Health>(
        {
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
          diet: {},
          rest: 0,
          mental_health: {},
        }
    );

    const required_info = () => {
        return health.user_id !== "" &&
            health.bpm !== 0 &&
            health.blood_pressure !== 0 &&
            health.blood_oxygen !== 0 &&
            health.temperature !== 0 &&
            health.timestamp !== new Date() &&
            health.weight !== 0 &&
            //health.symptoms !== "" &&
            health.hygiene.length !== 0 &&
            //health.workspace !== {} &&
            health.diet.size !== 0 &&
            health.rest !== 0 &&
            health.mental_health.size !== 0
    }

    const create = () => {
        if(required_info()){
            set_loading(true)
            HealthsAPI.create_health_rec(health)
                .catch((err) => {
                    console.log(err)
                })
                .finally(() => {
                    set_loading(false)
                    cancel()
                })

        }else{
            toast({
                title: 'Error.',
                description: "Please fill in all the required information",
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
        }
    }

    const cancel = () => {
        set_health(
            {
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
              diet: {},
              rest: 0,
              mental_health: {},
            }
        )
        onClose()
    }


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
              <ModalHeader>Complete Your Daily Check-In!</ModalHeader>
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
                  <Input ref={finalRef} placeholder="Coughing, sneezing, runny nose, sore muscles and etc. Be as detailed as you can be as this is important to analyze you health." />
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
diet: dict[str, float]
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
