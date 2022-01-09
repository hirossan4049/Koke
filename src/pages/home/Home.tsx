import * as React from "react"

import { Box, Heading, Flex, Text, Input, Center, Icon, Image, LinkOverlay, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { IoArrowForward } from "react-icons/io5";
import { HomeTrackItem } from "./components/HomeTrackItem";
import { useEffect, useState } from "react";

import { TrackListsType } from "../../actions/types";
import axios from "axios";

export const Home = () => {

    const [tracklists, setTracklists] = useState<[TrackListsType]>()

    document.title = "śvara tracklists"

    useEffect(() => {
        axios.get<[TrackListsType]>("http://localhost:8000/latest-tracklists")
        .then(res => {
            console.log("res.data", res.data)
          setTracklists(res.data)
          tracklists?.map((value, index) => {
            console.log(value.trackName, index)
          })
        })
      }, [])


    return (
        <>
            <Box bgGradient='linear(to-l, red.400, pink.400)' h="900" p={{md: 32, base: 4}} verticalAlign={"center"} transform={"skewY(-3deg)"} transformOrigin={"top left"} >
                <Box transform={"skewY(3deg)"}>
                    <Image src={"svara-logo.svg"} alt="svara logo" w={32} />

            <Center>
            <Image mt={32} src={"svara-logo.svg"} alt="svara logo" h={20} />
            </Center>
            <Text mt={10} fontSize={"2xl"} color={"gray.100"} fontWeight={"bold"} textAlign={"center"} >ಸ್ವರ śvaraはYoutubeに上がっている音楽ライブのトラックリストをより見やすくしたWebアプリです</Text>
            <Center>
                <InputGroup mt={28} w="500px" >
                    <Input bg={"white"} rounded={"full"} h={16} border={"none"} boxShadow={"red"} fontWeight={"bold"} shadow={"xl"} fontSize={"24"} placeholder='Youtube動画URLまたはIDを入力' />
                    <InputRightElement h={16} children={<IconButton aria-label="Search" icon={<Icon as={IoArrowForward} w={8} h={8} />} bgColor={"white"} color="red.400" mr={4} rounded={"full"} onClick={() => {console.log("clicked")}} />} />
                </InputGroup>
            </Center>
            </Box>
            </Box>

            <Center>
                <Box p={{base: 4, md: 32}} w={{base: "none",md: "6xl"}}>
                    <Text fontSize={"2xl"} fontWeight={"bold"} pl={6} >最近追加されたトラックリスト</Text>
                    { tracklists?.map((value) => (
                        <HomeTrackItem title={value.trackName} artist={"アーティスト: 不明"} href={"/tracklists/" + value.trackId} />
                        ))}
                </Box>
            </Center>
        </>
    )
}