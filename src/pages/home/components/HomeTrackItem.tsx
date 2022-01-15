import * as React from "react"
import { Box, Text, LinkBox, Image, Skeleton, Flex, Icon, ScaleFade, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoPlay } from "react-icons/io5";

export const HomeTrackItem = ({ title = "", artist = "", trackId = "", isLoading, href = ""}: {title: string, artist: string, trackId: String, isLoading?: boolean, href: string}) => {
    const [isHover, setIsHover] = React.useState(false)
    return (
        <LinkBox as='article' onMouseEnter={() => {setIsHover(true)}} onMouseLeave={() => {setIsHover(false)}} rounded="xl" bg={ "white" } shadow="sm" p={{base: 2, md: 3}} m={{base: 1, md: 4}} mb={4} mt={4}>
            { isLoading ?
            <Flex h={24}>
                <Skeleton w={36} rounded={"md"} />
            <Box textAlign={"left"} width={"50%"} >
                <Skeleton ml={4} mt={2} mb={2} h={"1rem"} width="100%" />
                <Skeleton ml={4} mb={2} h={{base: 4, md: 5}} w={20} />
            </Box>
            </Flex> :
            <Link to={href} >
                <Flex h={24}>
                    {/* src={"https://img.youtube.com/vi/" + trackId + "/0.jpg"} */}
                    <Image bg={"black"} src={"https://i.ytimg.com/vi/" + trackId + "/maxresdefault.jpg"} w={36} h={24} rounded={"md"} />
                    {/* <Image bg={"black"} w={36} h={24} rounded={"md"} /> */}
                    <Box position={"absolute"} w={36} h={24}>
                    <Center h={{base: '100%', md: 0}} >
                        <ScaleFade in={isHover}>
                            <Icon as={IoPlay} w={10} h={10}  color={"white"}/>
                        </ScaleFade>
                        </Center>
                    </Box>

                <Box textAlign={"left"} pl={4}>
                    <Text fontSize={{base: "md", md: 'xl'}} fontWeight="bold" color="gray.600"> {title} </Text>
                    <Text fontSize={{base: "12", md: 'sm'}} fontWeight="bold" color="gray.500" h={{base: 4, md: 5}}> {artist} </Text>
                </Box>
                </Flex>
            </Link>
            }
        </LinkBox>
    )
}