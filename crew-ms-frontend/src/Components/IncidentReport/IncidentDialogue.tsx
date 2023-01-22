import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    VStack,
    useColorModeValue,
    useToast,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    Skeleton,
    AlertDialogFooter, Button,
} from "@chakra-ui/react";
import React from "react";
import {Incident} from "../../Models/Incident";
import {IncidentsAPI} from "../../APIs/IncidentsAPI"
import { ObjectId } from "bson";


interface CreateIncidentDialogueCard {
    isOpen: boolean
    onClose: any
    cancelRef: any
}


export const CreateIncident = React.memo(({isOpen, onClose, cancelRef}: CreateIncidentDialogueCard) => {
    const toast = useToast()
    const [loading, set_loading] = React.useState<boolean>(false);

    const [incident, set_incident] = React.useState<Incident>(
        {
            _id: new ObjectId(),
            user_id: "",
            incident_type: "",
            associated_users: [],
            date: new Date(),
            status: "",
            description: ""
        }
    );

    const required_info = () => {
        return incident.user_id !== "" &&
            incident.associated_users.length != 0 &&
            incident.incident_type !== "" && incident.status !== "" &&
            incident.description !== "" && incident.date !== new Date()
    }

    const create = () => {
        if(required_info()){
            set_loading(true)
            IncidentsAPI.create_incident(incident)
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
        onClose()
        set_incident(
            {
                _id: new ObjectId(),
                user_id: "",
                incident_type: "",
                associated_users: [],
                date: new Date(),
                status: "",
                description: ""
            }
            )
    }

    return (
        <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Create Incident
            </AlertDialogHeader>

            <AlertDialogBody>
              {loading ?
                <Stack>
                  <Skeleton height='20px' />
                  <Skeleton height='20px' />
                  <Skeleton height='20px' />
                </Stack>
                :
                <>
                  <CreateIncidentDialog incident={incident} set_incident={set_incident} show_overview={false} show_save={false}/>
                </>
              }
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={cancel}>
                Cancel
              </Button>
              <Button colorScheme='green' onClick={create} ml={3}>
                Create
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    )

})


interface CreateIncidentCard {
    incident: Incident,
    set_incident: React.Dispatch<React.SetStateAction<Incident | undefined>> | React.Dispatch<React.SetStateAction<Incident>>
    show_save?: boolean
    show_overview?: boolean
}

export const CreateIncidentDialog = ({incident, set_incident} : CreateIncidentCard) =>  {

    const update_incident_state = (name: any, value: any) => {
        set_incident(
            (prevState: any) =>
                ({...prevState,
                [name]: value})
        );
    }

    return (
        <Stack>
        <Box
            as="form"
            bg="bg-surface"
            boxShadow={useColorModeValue('sm', 'sm-dark')}
            borderRadius="lg"
            flex="1"
        >
            <Stack px={{ base: '4'}}>
                <br></br>
                <VStack spacing="2" direction={{ base: 'column', md: 'row' }}>
                    <FormControl id="incident_type" isRequired>
                        <FormLabel>Incident Type</FormLabel>
                        <Input
                            value={incident.incident_type}
                            onChange={(value) => {
                                update_incident_state(value.target.id, value.target.value)
                            }}
                        />
                    </FormControl>
                    <FormControl id="description" isRequired>
                        <FormLabel>Description</FormLabel>
                        <Input
                            value={incident.description}
                            onChange={(value) => {
                                update_incident_state(value.target.id, Number(value.target.value))
                            }}
                        />
                    </FormControl>
                    <FormControl id="associated_users" isRequired>
                        <FormLabel>Associated Users</FormLabel>
                        <Input
                            value={incident.associated_users}
                            onChange={(value) => {
                                update_incident_state(value.target.id, Number(value.target.value))
                            }}
                        />
                    </FormControl>
                </VStack>
                <Stack spacing="6" direction={{ base: 'column', md: 'row' }}>

                </Stack>
            </Stack>
        </Box>
        </Stack>
    )
                        }