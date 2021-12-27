import React, { } from "react";

import { LinkBox, Box, Heading, LinkOverlay, Skeleton, Text, Flex, Icon } from '@chakra-ui/react'
import { TrackListsItemType } from "../../../actions/types";

import { IoPlay, IoPause } from "react-icons/io5";


function makeTime(num: number) {
    const timeH = Math.floor(num % (24 * 60 * 60) / (60 * 60));
    const timeM = Math.floor(num % (24 * 60 * 60) % (60 * 60) / 60);
    const timeS =num % (24 * 60 * 60) % (60 * 60) % 60;
    const timeDMS = timeH + ':' + timeM + ':' + timeS + '';
    return timeDMS;
  }
  

export const TrackItem = ({ item, isPlaying, onClick }: {item: TrackListsItemType, isPlaying: boolean, onClick: () => void }) => {
    return (
        <LinkBox as='article' rounded="md" bg="white" shadow="sm" p={2} m={4}>
            {/* <Skeleton mb={4} h={"1rem"} />
            <Skeleton mb={4} h={"1rem"} w={20} /> */}
        <LinkOverlay href={'#' + item.time} onClick={ () => onClick() }>
                <Flex align={"center"}>
                <Box p={3}>
                    { (isPlaying) ? <Icon as={IoPause} color="gray.600"/> :
                        <Icon as={IoPlay} color="gray.600"/>
                    }
                    
                </Box>
                <Box textAlign={"left"}>
                    <Text fontSize='lg' fontWeight="bold" color="gray.600"> { item.name } </Text>
                    <Text fontSize='sm' fontWeight="bold" color="gray.500"> { makeTime(item.time) } </Text>
                </Box>
                </Flex>
            </LinkOverlay>
        </LinkBox>

    )
}