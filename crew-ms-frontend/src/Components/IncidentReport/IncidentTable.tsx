import * as React from "react"
import {
    Box,
    VStack, Grid, GridItem, SimpleGrid, Text, Stack, Skeleton, Heading, Spacer, Center, Badge, HStack
} from "@chakra-ui/react"
import {ObjectID} from "bson";
import {IncidentsAPI} from "../../APIs/IncidentsAPI"
import {Component, memo, useEffect, useState} from "react";
import {Incident} from "../../Models/Incident";
import {TableFunction} from "../Table/Table";

interface TableData {
    _id: ObjectID
    incident_type: string
    date: Date
    status: string
}

export const IncidentTable = React.memo(() =>  {
    const [incidents, set_incidents] = useState<Array<TableData> | undefined>();

    const display_incidents = () => {
        IncidentsAPI.get_incidents_by(new Map())
            .then((res) => {
                let data = res!
                let entry = data.map((incident) => {
                    return {
                        _id: incident._id,
                        incident_type: incident.incident_type,
                        date: incident.date,
                        status: incident.status
                    }
                })
                set_incidents([])
                set_incidents(entry)
            })
    }

    useEffect(() => {
        display_incidents()
    }, []);

    const get_columns = () => {

        return [
            {
                Header: "Incident Type",
                accessor: "incident_type",
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
