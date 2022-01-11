import * as React from "react"
import { Box, Text, LinkBox, LinkOverlay, Skeleton } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const HomeTrackItem = ({ title = "", artist = "", isLoading, href = ""}: {title: string, artist: string, isLoading?: boolean, href: string}) => {
    return (
        <LinkBox as='article' rounded="xl" bg={ "white" } shadow="sm" p={{base: 2, md: 4}} m={{base: 1, md: 4}} mb={4} mt={4}>
            { isLoading ?
            <Box textAlign={"left"} >
                <Skeleton mb={2} h={"1rem"} />
                <Skeleton mb={2} h={{base: 4, md: 5}} w={20} />
            </Box> :
            <Link to={href} >
                <Box textAlign={"left"}>
                    <Text fontSize={{base: "md", md: 'xl'}} fontWeight="bold" color="gray.600"> {title} </Text>
                    <Text fontSize={{base: "12", md: 'sm'}} fontWeight="bold" color="gray.500" h={{base: 4, md: 5}}> {artist} </Text>
                </Box>
            </Link>
            }
        </LinkBox>
    )
}