import * as React from "react"
import {
    Avatar,
    Box, Center, Flex, Image, Stack, useColorModeValue,
    VStack, Text, Button, Heading, HStack, Link, Popover, PopoverTrigger,
    PopoverBody, PopoverCloseButton, PopoverHeader, PopoverContent, PopoverArrow, Spacer, StackDivider
} from "@chakra-ui/react"
import {BiExpand, BiParagraph, BiStop, FaGithub, FaLinkedin, FaStop, GrDocumentUpdate, GrUpdate, MdUpdate} from "react-icons/all";
import {useParams} from "react-router-dom";
import {UsersAPI} from "../../APIs/UsersAPI";
import {ObjectID} from "bson";
import {useEffect, useState} from "react";
import {User} from "../../Models/User";
import {ArrowForwardIcon, EditIcon, LockIcon} from "@chakra-ui/icons";

export const MemberDashboard = () => {

    let {user_id} = useParams();
    const [user, setUser] = useState<User>();

    const get_user = () => {
        UsersAPI.get_user(ObjectID.createFromHexString(user_id!))
            .then((res) => {
                let data = res!
                setUser(data)
            })
    }

    useEffect(() => {
        get_user();
    }, [])

    return (
        <Center py={6}>
            <Box
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}>
                <Flex justify={'center'} mt={12}>
                    <Avatar
                        size={'xxxl'}
                        src={user?.profile.profile_picture}
                        css={{
                            border: '2px solid white',
                        }}
                    />
                </Flex>

                <Box p={6}>
                    <VStack spacing={0} align={'center'} mb={5}>
                        <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                            {user?.profile.first_name + " " + user?.profile.last_name}
                        </Heading>
                        <Text color={'gray.500'}>{user?.profile.crew_position}</Text>
                        <Spacer></Spacer>
                    </VStack>
                    <Center>
                        <HStack align={"stretch"} alignItems={'center'}>
                            <VStack width={"300px"} divider={<StackDivider />} spacing='6'>
                              <Box>
                                <Heading size='m' textTransform='uppercase'>
                                  First Name
                                </Heading>
                                <Text pt='2' fontSize='s'>
                                    {user?.profile.first_name}
                                </Text>
                              </Box>
                              <Box>
                                <Heading size='m' textTransform='uppercase'>
                                  Username
                                </Heading>
                                <Text pt='2' fontSize='s'>
                                  {user?.username}
                                </Text>
                              </Box>
                              <Box>
                                <Heading size='m' textTransform='uppercase'>
                                  Position
                                </Heading>
                                <Text pt='2' fontSize='s'>
                                    {user?.profile.crew_position}
                                </Text>
                              </Box>
                            </VStack>
                            <Spacer width={"30px"}></Spacer>
                            <VStack width={"300px"} divider={<StackDivider />} spacing='6'>
                              <Box>
                                <Heading size='m' textTransform='uppercase'>
                                  Last Name
                                </Heading>
                                <Text pt='2' fontSize='s'>
                                    {user?.profile.last_name}
                                </Text>
                              </Box>
                              <Box>
                                <Heading size='m' textTransform='uppercase'>
                                  Email
                                </Heading>
                                <Text pt='2' fontSize='s'>
                                  {user?.profile.email}
                                </Text>
                              </Box>
                              <Box>
                                <Heading size='m' textTransform='uppercase'>
                                  Position
                                </Heading>
                                <Text pt='2' fontSize='s'>
                                    {user?.profile.crew_position}
                                </Text>
                              </Box>
                            </VStack>
                        </HStack>
                    </Center>
                    <Spacer height={"30px"}></Spacer>
                    <HStack>

                        <Button leftIcon={<EditIcon/>}>
                            <Link href={""}>Edit User</Link>
                        </Button>
                        <Button leftIcon={<ArrowForwardIcon/>}>
                            <Link href={""}>View Medical Record</Link>
                        </Button>
                        <Spacer></Spacer>
                        <Button leftIcon={<BiExpand></BiExpand>}>
                            <Link href={""}>Biography</Link>
                        </Button>
                        <Button leftIcon={<LockIcon></LockIcon>}>
                            <Link href={""}>File A Report</Link>
                        </Button>


                    </HStack>
                </Box>
            </Box>
        </Center>
    )
    }
