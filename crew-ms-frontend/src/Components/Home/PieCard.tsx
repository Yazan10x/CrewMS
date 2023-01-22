import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Heading,
    Stack,
    Text,
    Image, Box, Center, LightMode, HStack
} from "@chakra-ui/react";
import {PieChart} from "./PieChart";
import {render} from "@testing-library/react";

export const PieCard = () => {
    return (
        <HStack
        align='stretch'>
            <LightMode>
            <Card
                // direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
                align='center'
                minW={'3000px'}
            >
            <Stack>
                <CardBody>
                        <Box>
                            <Heading size='md'>Crew Diversity</Heading>
                            <Text>
                                The following shows the demographic of the crew by showing the diversity of races.
                            </Text>
                            <PieChart></PieChart>
                        </Box>
                </CardBody>
                {/*<Box p={5} shadow='md' borderWidth='1px'>*/}
                {/*    /!*<Heading fontSize='xl'>{"Crew's Diversity"}</Heading>*!/*/}
                {/*    <Text mt={4}><PieChart></PieChart></Text>*/}
                {/*</Box>*/}
            </Stack>
            </Card>
        </LightMode>
        </HStack>
    )
}
