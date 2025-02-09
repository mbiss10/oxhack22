import Head from 'next/head'
import {
  Text,
  Heading,
  CheckboxGroup,
  Checkbox,
  VStack,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  Center,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import React, { FormEvent, useEffect, useState } from 'react';

import { getAllContractAccolades } from "../lib/getaccs"

import { Container, Main, Footer } from '../components'
import { useRouter } from 'next/router'
import { AccoladeAPIDatum } from './accolades/[accolades]';

const Accolades = () => (
  <Container height="100vh">
    <Head>
      <title>Explore </title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Main>
        <UserProfileEdit/>
    </Main>

    <Footer>
      <Text>Courtesy of the best OxHack22 Team ❤️</Text>
    </Footer>
  </Container>
)

interface ObjectMap {
    [name: string]: string
}

const signets: ObjectMap = {
    "spotify": "0x150fB911DA54B7841c841B0B939D9006C6feDC15",
    "oxhack": "0x47a2f25ad83Efa1BaA376D062284e777dD223463",
    "redcross": "0xb9a749F903682127dE0b29BA02C10c847A6593b6",
    "strava": "0x75F60C7CEe414FE60bB96a12d930F3DC8E59eEf3",
}

const brands = {
    "premierleague": "https://s3.amazonaws.com/premierleague-static-files/premierleague/pl_icon.png",
    "nba": "http://nbahoopsonline.com/Articles/2016-17/nbaaplogo.jpg",
    "oxdack2022": "https://oxfordhack22.co.uk/logo512.png",
    "spotify": "https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-download-logo-30.png",
    "netflix": "https://cdn.vox-cdn.com/thumbor/AwKSiDyDnwy_qoVdLPyoRPUPo00=/39x0:3111x2048/1400x1400/filters:focal(39x0:3111x2048):format(png)/cdn.vox-cdn.com/uploads/chorus_image/image/49901753/netflixlogo.0.0.png",
    "audible": "https://pbs.twimg.com/profile_images/1098979859446095873/TbBByTY3_400x400.png",
    "duolingo": "https://www.duolingo.com/images/facebook/duo200.png",
    "coursera": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Coursera-Logo_600x600.svg/1200px-Coursera-Logo_600x600.svg.png",
    "udacity": "https://media.glassdoor.com/sqll/659776/udacity-squarelogo-1458083545831.png",
    "chainshot": "https://d92mrp7hetgfk.cloudfront.net/images/sites/misc/ChainShot_Logo/original.png?1615842691",
    "mapmyrun": "https://blog.mapmyrun.com/wp-content/uploads/2020/04/RUN-AppIcon.png",
    "strava": "https://icon-library.com/images/strava-icon/strava-icon-10.jpg",
    "fitbit": "https://media.glassdoor.com/sqll/500145/fitbit-squarelogo-1452064129606.png",
    "applefitness": "https://www.iphonejd.com/.a/6a010535fde333970c026be43261f5200d-pi",
    "peloton": "https://play-lh.googleusercontent.com/wNmoGX3LqZUzZeCtvTm3jSAcwrvt9wRnjo5CYydSkiQOBf5IDNB8ndBkpRLVU6xpggX3",
    "alltrails": "https://media.glassdoor.com/sqll/2311916/alltrails-squarelogo-1539895815445.png"
}

export default Accolades

function UserProfileEdit(): JSX.Element {
    const router = useRouter()
    const brand: string = router.query.brand ? router.query.brand.toString() : "";
    const [tokens, setTokens] = useState([]);

    useEffect(()=>{
      if (brand != undefined && brand != "") {
        if (signets[brand] != undefined) {
          getAllContractAccolades(signets[brand]).then((response) => {
            setTokens(response)
          })
        }
      }
    }, [brand])

    function onSubmit(event: FormEvent) {
      console.log(event)
      event.preventDefault();
      const elements = (event.target as HTMLFormElement).elements as HTMLFormControlsCollection
      Array.from(elements).map(function(key, index) {
        const element = (elements[index] as HTMLInputElement)
        if (element.type === "checkbox" && element.checked) {
          console.log(element.value)
        }
      });
    }

    return (
      <Flex
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            Authorise Accolades
          </Heading>
          <Center>
            <HStack spacing={12}>
                <Avatar size="xl" src="/favicon.ico"/>
                <CheckCircleIcon color={'green.500'} boxSize={'2em'}/>
                <Avatar size="xl" src={brands[brand]}/>
            </HStack>
          </Center>
          <form onSubmit={onSubmit}>
          <FormControl id="selectingAccolades">
            <FormLabel>Select which of your accolades you would like to import</FormLabel>
            <CheckboxGroup colorScheme='green' defaultValue={['naruto', 'kakashi']}>
            <VStack spacing={[1, 5]} py={12}>
            {signets[brand] != undefined ? tokens.length ? tokens.map((value, index: number) => (
              <Checkbox value={'pk_' + index.toString()} id={index.toString()} key={index.toString()}>{value.name}</Checkbox>
            )): <p>Loading...</p> : <p>No tokens to claim</p>}
            </VStack>
            </CheckboxGroup>
          </FormControl>
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg={'red.400'}
              color={'white'}
              onClick={() => router.push('/explore')}
              w="full"
              _hover={{
                bg: 'red.500',
              }}>
              Cancel
            </Button>
            <Button
              type="submit"
              bg={'blue.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'blue.500',
              }}>
              Submit
            </Button>
          </Stack>
          </form>
        </Stack>
      </Flex>
    );
  }
