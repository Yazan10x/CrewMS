import * as React from "react"
import {
    Box,
    VStack, Grid, GridItem, SimpleGrid, Text, Stack, Skeleton, Heading, Spacer, Center, Badge, HStack, Code
} from "@chakra-ui/react"
import {ObjectID} from "bson";
import {IncidentsAPI} from "../../APIs/IncidentsAPI"
import {Component, memo, useEffect, useState} from "react";
import {Incident} from "../../Models/Incident";
import {TableFunction} from "../Table/Table";
import {HealthsAPI} from "../../APIs/HealthsAPI";
import {Health} from "../../Models/Health";
import {useParams} from "react-router-dom";

interface TableData {
    _id: ObjectID
    date: Date
    health_record: Health
}

export const HealthTable = React.memo(() =>  {
    let {user_id} = useParams();
    const [incidents, set_incidents] = useState<Array<TableData> | undefined>();

    const display_records = () => {
        let map = new Map()
        map.set("user_id", user_id!)
        HealthsAPI.get_records_by(map)
            .then((res) => {
                let data = res!
                let entry = data.map((record) => {
                    return {
                        _id: record._id,
                        date: record.timestamp,
                        health_record: record
                    }
                })
                set_incidents([])
                set_incidents(entry)
            })
    }

    useEffect(() => {
        display_records()
    }, []);

    const get_columns = () => {

        return [
            {
                Header: "_id",
                accessor: "_id",
                Cell: function StatusCell(_id: ObjectID) {

                    return (
                        <>
                            <Code>
                                {_id.toString()}
                            </Code>
                        </>
                    )

                    },
            },
            {
                Header: "Date",
                accessor: "date",
            },
            {
                Header: "Status",
                accessor: "status",
            },
            {
                Header: "",
                accessor: "_id",
                Cell: function StatusCell(_id: ObjectID) {

                    return (<>
                    </>)

                    },
            },
            {
                Header: "",
                accessor: "_id",
                Cell: function StatusCell(_id: ObjectID) {

                    return (<>
                    </>)

                    },
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
                {incidents ?
                    <TableFunction data={incidents} columns={get_columns()} hover_color='cyan.400'/>
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
