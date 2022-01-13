import React from 'react'
import { useNavigate } from 'react-router-dom';

import { Box, Heading, Flex, Text, Input, Center, Icon, Image, LinkOverlay, InputGroup, InputRightElement, IconButton, useToast } from "@chakra-ui/react";
import { IoArrowForward } from "react-icons/io5";
import { HomeTrackItem } from "./components/HomeTrackItem";
import { KeyboardEvent, useEffect, useState } from "react";

import { TrackListsType } from "../../actions/types";
import axios from "axios";
import { fetchLatestTracklists } from "../../actions/api";


export const Home = () => {
    const navigate = useNavigate();
    const [tracklists, setTracklists] = useState<[TrackListsType]>()
    const [searchText, setSearchText] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const toast = useToast()

    document.title = "śvara tracklists"

    useEffect(() => {
        // fetchLatestTracklists(cb) 

        axios.get<[TrackListsType]>("https://s-vara.herokuapp.com/latest-tracklists")
        .then(res => {
            setTracklists(res.data)
            setIsLoading(false)
        })
      }, [])

      const navigateTrackLists = () => {
          if (searchText !== "") {
            navigate('/tracklists/' + searchText)
          }else {
            toast({
                title: '値が空です。',
                position: "top",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
          }
      }

      const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key == "Enter") {
              navigateTrackLists()
          }
      }


    return (
        <>
            <Box bgGradient='linear(to-l, red.400, pink.400)' h={{md: "900", base: "300"}} p={{md: 32, base: 4}} verticalAlign={"center"} transform={"skewY(-3deg)"} transformOrigin={"top left"} >
                <Box transform={"skewY(3deg)"}>
                    <Image src={"svara-logo.svg"} alt="svara logo" w={{md: 32, base: 24}} />

            <Center>
            <Image mt={{md: 32, base: 0}} src={"svara-logo.svg"} alt="svara logo" h={{md: 20, base: 0}} />
            </Center>
            <Text mt={10} fontSize={{md: "2xl", base: "xl"}} color={"gray.100"} fontWeight={"bold"} textAlign={"center"} >ಸ್ವರ śvaraはYoutubeに上がっている音楽ライブのトラックリストをより見やすくしたWebアプリです</Text>
            <Center>
                <InputGroup mt={{md: 28, base: 6}} w="500px" >
                    <Input onKeyDown={handleKeydown} value={searchText} onChange={(e) => {setSearchText(e.target.value)}} bg={"white"} rounded={"full"} h={{md: 16, base: 12}} border={"none"} boxShadow={"red"} fontWeight={"bold"} shadow={"xl"} fontSize={{md: "24", base: "18"}} placeholder='Youtube動画URLまたはIDを入力' />
                    <InputRightElement h={{md: 16, base: 12}} children={<IconButton aria-label="Search" icon={<Icon as={IoArrowForward} w={{md: 8, base: 6}} h={{md: 8, base: 6}} />} bgColor={"white"} color="red.400" mr={4} rounded={"full"} onClick={() => {navigateTrackLists()}} />} />
                </InputGroup>
            </Center>
            </Box>
            </Box>

            <Center>
                <Box p={{base: 1, md: 32}} w={{base: "none",md: "6xl"}} mt={{base: 8, md: "0"}} width="100%">
                    <Text fontSize={{base: "xl", md: "2xl"}} fontWeight={"bold"} pl={{base: 2, md: 6}} >最近追加されたトラックリスト</Text>
                    { isLoading ?
                        <Box>
                        <HomeTrackItem isLoading={true} title={""} artist={""} href={""} />
                        <HomeTrackItem isLoading={true} title={""} artist={""} href={""} />
                        <HomeTrackItem isLoading={true} title={""} artist={""} href={""} />
                        <HomeTrackItem isLoading={true} title={""} artist={""} href={""} />
                        <HomeTrackItem isLoading={true} title={""} artist={""} href={""} />
                        <HomeTrackItem isLoading={true} title={""} artist={""} href={""} />
                        </Box>
                        :
                        tracklists?.map((value) => (
                            <HomeTrackItem title={value.trackName} artist={"アーティスト: 不明"} href={"/tracklists/" + value.trackId} />
                            ))
                    }
                </Box>
            </Center>
        </>
    )
}