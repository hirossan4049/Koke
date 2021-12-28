import * as React from "react"
import { Box, Text, LinkBox, LinkOverlay, Skeleton } from "@chakra-ui/react";

export const HomeTrackItem = ({ title, artist, isLoading, href}: {title: string, artist: string, isLoading?: boolean, href: string}) => {
    return (
        <LinkBox as='article' rounded="xl" bg={ "white" } shadow="sm" p={4} m={4}>
            { isLoading ?
            <Box textAlign={"left"} >
                <Skeleton mb={4} h={"1rem"} />
                <Skeleton mb={4} h={"1rem"} w={20} />
            </Box> :
            <LinkOverlay href={href} >
                <Box textAlign={"left"}>
                    <Text fontSize='xl' fontWeight="bold" color="gray.600"> {title} </Text>
                    <Text fontSize='sm' fontWeight="bold" color="gray.500" h={5}> {artist} </Text>
                </Box>
            </LinkOverlay>
            }
        </LinkBox>
    )
}