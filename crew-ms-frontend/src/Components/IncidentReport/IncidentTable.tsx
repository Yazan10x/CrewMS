import * as React from "react"
import {
    Box,
    VStack,
    Grid,
    GridItem,
    SimpleGrid,
    Text,
    Stack,
    Skeleton,
    Heading,
    Spacer,
    Center,
    Badge,
    HStack,
    Button,
    ButtonGroup,
    IconButton,
    Input,
    useDisclosure
} from "@chakra-ui/react"
import {ObjectId, ObjectID} from "bson";
import {IncidentsAPI} from "../../APIs/IncidentsAPI"
import {Component, memo, useEffect, useState} from "react";
import {Incident} from "../../Models/Incident";
import {TableFunction} from "../Table/Table";
import { DeleteIcon, ArrowForwardIcon, AddIcon } from "@chakra-ui/icons";
import { BiExpand } from "react-icons/bi";
import { CgExpand } from "react-icons/cg";
import { CreateIncident, CreateIncidentDialog } from "./IncidentDialogue";
import {UsersAPI} from "../../APIs/UsersAPI";


interface TableData {
    _id: ObjectID
    incident_type: string
    date: Date
    status: string
    incident: Incident
}

export const IncidentTable = React.memo(() =>  {

    const [incidents, set_incidents] = useState<Array<TableData> | undefined>();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    const display_incidents = () => {
        IncidentsAPI.get_incidents_by(new Map())
            .then((res) => {
                let data = res!
                let entry = data.map((incident) => {
                    // @ts-ignore
                    return {
                        _id: incident._id,
                        incident_type: incident.incident_type,
                        date: incident.date,
                        status: incident.status,
                        incident: incident
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
                Cell: function StatusCell(date: Date) {
                        return (
                            <Box>
                                <Text>
                                    {date.toString().slice(0, 17)}
                                </Text>
                            </Box>
                        )
                    },
            },
            {
                Header: "Status",
                accessor: "status",
                Cell: function StatusCell(status: string) {

                    if (status === "Processing") {
                    return (
                        <Box>
                             <Badge colorScheme='orange'>Processing</Badge>
                        </Box>
                    )
                    } else {
                        return (
                            <Box>
                                 <Badge colorScheme='green'>Completed</Badge>
                            </Box>
                        )
                    }

                    },
            },
            {
                Header: "",
                accessor: "incident",
                Cell: function StatusCell(incident: Incident) {

                    const delete_action = () => {
                        IncidentsAPI.delete_incident(incident._id)
                            .then((res) => {
                                console.log(res)
                            })
                        window.location.reload()
                    }

                    if (incident.status !== "Completed") {
                        return (
                        <IconButton
                            colorScheme='red'
                            size='sm'
                            aria-label='Search database'
                            icon={<DeleteIcon/>}
                            onClick={() => delete_incident(incident._id)}
                        />)
                    } else {
                        return (
                            <>
                            </>
                        )
                    }

                    },
            },
        ]
    }
    return(
        <Box overflowX="auto" overflowY="hidden">
            <Spacer></Spacer>
            <Box flex={'1'}>
                <Stack>
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
                    <IconButton aria-label="Add" colorScheme={'green'} onClick={onOpen}>
                        <AddIcon>
                        </AddIcon>
                    </IconButton>
                    <CreateIncident isOpen={isOpen} onClose={onClose} cancelRef={cancelRef}></CreateIncident>
                </Stack>
            </Box>
       </Box>)
})
