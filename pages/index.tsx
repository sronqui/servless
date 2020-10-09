import React, { useState, FormEvent, useEffect } from 'react';

import { Flex, Button, Text, Box, Heading, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter } from '@chakra-ui/core'
import axios from 'axios';
import { Line } from 'react-chartjs-2';

import Input from '../components/Input'

export default function Home()
{
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  const [temp, setTemp] = useState(0);
  const [humid, setHumid] = useState(0);
  const [press, setPress] = useState(0);

  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());
  const [list, setList] = useState({});

  useEffect(() => handleQuery(), []);

  function handleQuery()
  {
    axios.get('/api/list', { params: { startDate: new Date(), endDate: new Date() } })
      .then(res =>
      {
        const map = {
          labels: [],
          datasets: [{
            label: 'temp',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(130, 87, 229,0.4)',
            borderColor: 'rgba(130, 87, 229,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(130, 87, 229,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(130, 87, 229,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 10,
            data: []
          }]
        };

        res.data.map(d =>
        {
          map.labels.push(`${d.addDate.substring(0,10).split('-').reverse().join('/')} ${d.addDate.substring(11,16)}`);
          // map.labels.push(d.addDate.replace(/(\d*)-(\d*)-(\d*).*/, '$3/$2/$1'));
          // map.labels.push(d.addDate);
          map.datasets[0].data.push(d.temp);
        });

        setList(map);

        setTemp(res.data[res.data.length - 1].temp);
        setHumid(res.data[res.data.length - 1].humid);
        setPress(res.data[res.data.length - 1].press);
      })
      .catch((err) =>
      {
        console.error("ocorreu um erro " + err);
      });
  };

  function handleSignUpToNewsletter(event: FormEvent)
  {
    event.preventDefault();

    axios.post('/api/add', { temp, humid, press });
  }

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Action</DrawerHeader>
          <DrawerBody>

            <Flex
              as="main"
              justifyContent="center"
              flexDirection="column"
            >

              <Flex
                as="div"
                backgroundColor="gray.700"
                borderRadius="md"
                flexDir="column"
                alignItems="stretch"
                padding={8}
                marginTop={4}
                width="100%"
                maxW="100%"
              >
                {/* <Input
                  placeholder="startDate"
                  marginTop={2}
                  // value={startDate}
                  type="date"
                  onChange={e => setStartDate(e.target.value)}
                />

                <Input
                  placeholder="endDate"
                  marginTop={2}
                  // value={endDate}
                  type="date"
                  onChange={e => setEndDate(e.target.value)}
                /> */}

                <Button
                  type="button"
                  backgroundColor="purple.500"
                  height="50px"
                  borderRadius="sm"
                  marginTop={6}
                  width="100%"
                  _hover={{ backgroundColor: 'purple.600' }}
                  onClick={() => handleQuery()}
                >
                  Buscar
              </Button>
              </Flex>

              <Flex
                as="form"
                onSubmit={handleSignUpToNewsletter}
                backgroundColor="gray.700"
                borderRadius="md"
                flexDir="column"
                alignItems="stretch"
                padding={8}
                marginTop={4}
                width="100%"
                maxW="100%"
              >
                <Input
                  placeholder="setTemp"
                  marginTop={2}
                  value={temp}
                  onChange={e => setTemp(e.target.value)}
                />
                <Input
                  placeholder="setHumid"
                  marginTop={2}
                  value={humid}
                  onChange={e => setHumid(e.target.value)}
                />
                <Input
                  placeholder="setPress"
                  marginTop={2}
                  value={press}
                  onChange={e => setPress(e.target.value)}
                />

                <Button
                  type="submit"
                  backgroundColor="purple.500"
                  height="50px"
                  borderRadius="sm"
                  marginTop={6}
                  _hover={{ backgroundColor: 'purple.600' }}
                >
                  Incluir
                </Button>
              </Flex>
            </Flex>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Flex
        as="nav"
        bg="gray.700"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem"
        color="white"
      >
        <Flex
          align="center"
          mr={5}>
          <Heading
            as="h1"
            size="lg"
            letterSpacing={"-.1rem"}
          >
            Temp
          </Heading>
        </Flex>

        {/* <Box
          display={{ base: "block", md: "none" }}
          onClick={handleToggle}
        >
          <svg
            fill="white"
            width="12px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </Box> */}

        {/* <Box
          display={{ sm: show ? "block" : "none", md: "flex" }}
          width={{ sm: "full", md: "auto" }}
          alignItems="center"
          flexGrow={1}
        >
          <Text
            mt={{ base: 4, md: 0 }}
            mr={6}
            display="block"
          >
            Docs
          </Text>
          <Text
            mt={{ base: 4, md: 0 }}
            mr={6}
            display="block"
          >
            Examples
          </Text>
        </Box> */}

        <Box>
          <Flex
            as="div"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              ref={btnRef}
              type="button"
              // backgroundColor="purple.500"
              height="50px"
              borderRadius="sm"
              // margin={6}
              width="100%"
              // _hover={{ backgroundColor: 'purple.600' }}
              onClick={onOpen}
            >
              Action
              </Button>
          </Flex>
        </Box>

      </Flex>

      <Flex
        as="main"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Flex
          backgroundColor="gray.700"
          borderRadius="md"
          flexDir="column"
          alignItems="stretch"
          padding={8}
          marginTop={4}
          width={[
            "95%",
            "80%",
            "60%",
            "40%",
          ]}
        >
          {/* {list.map((l) =>
          {
            return (
              <>
                <Box m={5} p={5} shadow="md" borderLeft="2px solid" borderWidth="1px">
                  <Heading fontSize="xl">Temp</Heading>
                  <Text mt={4}>{l.temp}</Text>
                </Box>
                <Box m={5} p={5} shadow="md" borderLeft="2px solid" borderWidth="1px">
                  <Heading fontSize="xl">Press</Heading>
                  <Text mt={4}>{l.press}</Text>
                </Box>
                <Box m={5} p={5} shadow="md" borderLeft="2px solid" borderWidth="1px">
                  <Heading fontSize="xl">Humid</Heading>
                  <Text mt={4}>{l.humid}</Text>
                </Box>
              </>
            )
          })} */}

          <Box
            m={5}
            p={5}
            shadow="md"
            borderLeft="2px solid"
            borderWidth="1px">
            <Heading
              fontSize="xl">
              Temp
              </Heading>
            <Text
              mt={4}
            >
              {temp}
            </Text>
          </Box>
          <Box
            m={5}
            p={5}
            shadow="md"
            borderLeft="2px solid"
            borderWidth="1px">
            <Heading
              fontSize="xl">
              Press
              </Heading>
            <Text
              mt={4}
            >
              {press}
            </Text>
          </Box>
          <Box
            m={5}
            p={5}
            shadow="md"
            borderLeft="2px solid"
            borderWidth="1px">
            <Heading
              fontSize="xl"
            >Humid
            </Heading>
            <Text
              mt={4}
            >
              {humid}
            </Text>
          </Box>
          <Box
            m={5}
            p={5}
            shadow="md"
            borderLeft="2px solid"
            borderWidth="1px">
            < Line
              data={list}
              options={{

                legend: {
                  display: false
                },
              }}
            />
          </Box>
        </Flex>
      </Flex>


      <Flex
        bg="gray.700"
        w="100%"
        px={5}
        py={4}
        justifyContent="center"
        alignItems="center"
        borderTop="1px solid"
        marginTop='20px'
      >
        <Flex
          flexDirection="row"
          justifyContent="center"
          alignItems="center">
          <Text
            pl={3}
            color="white"
          >
            Copyright © 2020
          </Text>
        </Flex>
      </Flex>
    </>
  )
}
