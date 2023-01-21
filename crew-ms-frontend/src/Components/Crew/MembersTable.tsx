import * as React from "react"
import {
    Box,
    VStack, Grid, GridItem, SimpleGrid, Text, Stack, Skeleton, Heading, Spacer, Center, Badge, HStack
} from "@chakra-ui/react"

import {UsersAPI} from "../../APIs/UsersAPI"
import {Component, memo, useEffect, useState} from "react";
import {User} from "../../Models/User";
import {TableFunction} from "../Table/Table";

interface TableData {
    full_name: string
    username: string
    email: string
    position: string
    link: string
}

export const MembersTable = React.memo(() =>  {
    const [users, set_users] = useState<Array<TableData> | undefined>();

    const display_users = () => {
        UsersAPI.get_users()
            .then((res) => {
                let data = res!
                let entry = data.map((user) => {
                    return {
                        full_name: user.profile.first_name + " " + user.profile.last_name,
                        username: user.username,
                        email: user.profile.email,
                        position: user.profile.crew_position,
                        link: window.location.pathname + "/" + user._id.toString()
                    }
                })
                set_users([])
                set_users(entry)
            })
    }

    useEffect(() => {
        display_users()
    }, []);

    const get_columns = () => {

        return [
            {
                Header: "Name",
                accessor: "full_name",
            },
            {
                Header: "Username",
                accessor: "username",
            },
            {
                Header: "Email",
                accessor: "email",
            },
            {
                Header: "Position",
                accessor: "position",
            },
        ]
    }

    return(
        <Box overflowX="auto" overflowY="hidden">
            <Center>
                <VStack>
                    <Heading size="xl" mb="6">
                        Members Page
                    </Heading>
                    <Badge colorScheme={'red'}>
                        New | Sign Up to be added
                    </Badge>
                </VStack>

            </Center>
            <Spacer></Spacer>
            <Box>
                {users ?
                    <TableFunction data={users} columns={get_columns()} hover_color='cyan.400'/>
                :
                    <Stack>
                        <Skeleton height='50px' />
                        <Skeleton height='50px' />
                        <Skeleton height='50px' />
                        <Skeleton height='50px' />
                        <Skeleton height='50px' />
                        <Skeleton height='50px' />
                        <Skeleton height='50px' />
                        <Skeleton height='50px' />
                    </Stack>
            }
            </Box>
       </Box>)
})
