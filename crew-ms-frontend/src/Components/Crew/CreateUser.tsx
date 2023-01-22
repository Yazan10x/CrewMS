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
// import {Evaluation} from "../../models/evaluation";
// import {new_oid, ObjectId} from "../../utils/ObjectId";
// import {EvaluationAPI} from "../../api/EvaluationAPI";
import {User} from "../../Models/User";
import {ObjectId} from "bson";
import {UsersAPI} from "../../APIs/UsersAPI";
import get_users = UsersAPI.get_users;


interface CreateUserDialogCard {
    user_id: ObjectId
    isOpen: boolean
    onClose: any
    cancelRef: any
}


export const CreateUser = React.memo(({user_id, isOpen, onClose, cancelRef}: CreateUserDialogCard) => {
    const toast = useToast()
    const [loading, set_loading] = React.useState<boolean>(false);

    const [user, set_user] = React.useState<User>(
        {
            _id: new ObjectId(),
            username: "",
            demographics: {
                gender: "",
                race: "",
                age: "",
                sex: "",
                blood_type: "",
                health_conditions: "",
            },
            has_admin: false,
            profile: {
                first_name: "",
                last_name: "",
                email: "",
                crew_position: "",
                bio: "",
                profile_picture: "",
            }

        }
    );

    const required_info = () => {
        return (user.profile.first_name !== "" && user.profile.last_name !== "" &&
            user.profile.email !== "" && user.profile.crew_position !== "") ||
            user.profile.crew_position == "Pilot" || user.profile.crew_position == "Astronaut" ||
            user.profile.crew_position == "Engineer" || user.profile.crew_position == "Doctor" ||
            user.profile.crew_position == "Astrologist"
    }

    const create = () => {
        if(required_info()){
            set_loading(true)
            UsersAPI.create_user(user)
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
        set_user(
            {
                _id: new ObjectId(),
                username: "",
                demographics: {
                    gender: "",
                    race: "",
                    age: "",
                    sex: "",
                    blood_type: "",
                    health_conditions: "",
                },
                has_admin: false,
                profile: {
                    first_name: "",
                    last_name: "",
                    email: "",
                    crew_position: "",
                    bio: "",
                    profile_picture: "",
                }
            })
        onClose()
    }

    return (
        <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Create Evaluation
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
                  <CreateUserDialog user={user} set_user={set_user} show_overview={false} show_save={false}/>
                </>
              }
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={cancel} isDisabled={loading}>
                Cancel
              </Button>
              <Button colorScheme='green' onClick={create} ml={3} isDisabled={loading}>
                Create
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    )

})


interface CreateUserCard {
    user: User,
    set_user: React.Dispatch<React.SetStateAction<User | undefined>> | React.Dispatch<React.SetStateAction<User>>
    show_save?: boolean
    show_overview?: boolean
}

export const CreateUserDialog = ({user, set_user} : CreateUserCard) =>  {

    const update_user_state = (name: any, value: any) => {
        set_user(
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
                    <FormControl id="name" isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input
                            value={user.username}
                            onChange={(value) => {
                                update_user_state(value.target.id, value.target.value)
                            }}
                        />
                    </FormControl>
                    <FormControl id="total" isRequired>
                        <FormLabel>First Name</FormLabel>
                        <Input
                            value={user.profile.first_name}
                            onChange={(value) => {
                                update_user_state(value.target.id, Number(value.target.value))
                            }}
                        />
                    </FormControl>
                    <FormControl id="weight" isRequired>
                        <FormLabel>Last Name</FormLabel>
                        <Input
                            value={user.profile.last_name}
                            onChange={(value) => {
                                update_user_state(value.target.id, Number(value.target.value))
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
