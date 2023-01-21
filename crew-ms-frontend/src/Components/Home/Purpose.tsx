import {
    Avatar,
    Box,
    chakra,
    Container,
    Flex,
    Icon,
    Text,
    SimpleGrid,
    Stack,
    useColorModeValue,
    Heading,
    VStack,
    Card,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
} from '@chakra-ui/react';
import * as React from "react";
import {PieChart} from "./PieChart";
import {RadarChart} from "./RadarChart";
import {PieCard} from "./PieCard";
import {RadarCard} from "./RadarCard";
import {UsersAPI} from "../../APIs/UsersAPI";
import {useEffect, useState} from "react";


export const Purpose = () => {

    const [count, setCount] = useState<string>("")

    const get_user_count = () => {
        UsersAPI.get_users().then((res) => {
            let data = res!
            setCount(data.length.toString())
        })
    }

    useEffect(() => {
        get_user_count()
    }, []);

  return (
    <Flex
      textAlign={'center'}
      pt={10}
      justifyContent={'center'}
      direction={'column'}
      width={'full'}>
        <Stack as={Box} textAlign={'center'} spacing={{ base: 8, md: 14 }} py={{ base: 25, md: 36 }}>
            <VStack align="stretch">
                <PieCard></PieCard>
                <RadarCard></RadarCard>
            </VStack>
          <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
            lineHeight={'110%'}>
            Here is a quick update on our Crewsade! <br />
          </Heading>
        </Stack>
      <SimpleGrid
        columns={[2, null, 2]}
        spacing={'20'}
        mt={16}
        mx={'auto'}>
          <Card
              variant = 'elevated'
              minW={"400px"}
              >
              <Stat>
                  <StatLabel fontSize={'3xl'}>Number of Members</StatLabel>
                  <StatNumber>{count}</StatNumber>
                  <StatHelpText>Present time</StatHelpText>
              </Stat>
          </Card>
          <Card
              variant = 'elevated'
              >
              <Stat>
                  <StatLabel fontSize={'3xl'}>Type of Exploration</StatLabel>
                  <StatNumber>Space Exploration</StatNumber>
                  <StatHelpText>Journey beyond the milky way!</StatHelpText>
              </Stat>
          </Card>
          <Card
              variant = 'elevated'
              >
              <Stat>
                  <StatLabel fontSize={'3xl'}>Mode of Transportation</StatLabel>
                  <StatNumber>Space Shuttle</StatNumber>
                  <StatHelpText>A NASA Project</StatHelpText>
              </Stat>
          </Card>
          <Card
              variant = 'elevated'
              >
              <Stat>
                  <StatLabel fontSize={'3xl'}>Travel Speed</StatLabel>
                  <StatNumber>28,000</StatNumber>
                  <StatHelpText>km/hr</StatHelpText>
              </Stat>
          </Card>
      </SimpleGrid>
    </Flex>
  );
}

