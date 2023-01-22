import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Heading,
    Stack,
    Text,
    Image, Box, Center, LightMode
} from "@chakra-ui/react";
import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import {RadarChart} from "./RadarChart";
import {GiBulletImpacts} from "react-icons/all";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const RadarCard = () => {
    return (
        <LightMode>
            <Card
                  // direction={{ base: 'column', sm: 'row' }}
                  overflow='hidden'
                  variant='outline'
                  align='center'
                  minW={'1400px'}
            >
              <Stack>
                <CardBody>
                    <Box>
                            <Heading size='md'>Average Crew Statistics</Heading>
                            <Text>
                                The following graph shows the average statistics of all crew members, in the following categories
                            </Text>
                        <li>
                            The number of hours of sleep crew members get on a weekly basis
                        </li>
                        <li>
                            The number of meals the crew members have on a weekly basis
                        </li>
                        <li>
                            The number of hours crew members engage in physical exersice
                        </li>
                        <li>
                            The average level of workplace organization by the crew members. (This is ranked from 1-5 where 1 is very unorganized and 5 is very organized).
                        </li>
                        <li>
                            The average level of a healthy mindset of the crew members. (This is ranked from 1-5 where 1 is weak mental health and 5 is strong mental health).
                        </li>
                        <Center>
                            <Box width='800px'>
                                <RadarChart></RadarChart>
                            </Box>
                        </Center>
                    </Box>
                </CardBody>
                {/*<Box p={5} shadow='md' borderWidth='1px'>*/}
                {/*        /!*<Heading fontSize='xl'>{"Crew's Diversity"}</Heading>*!/*/}
                {/*        <Text mt={4}><RadarChart></RadarChart></Text>*/}
                {/*    </Box>*/}
              </Stack>
            </Card>
        </LightMode>
    )
}
