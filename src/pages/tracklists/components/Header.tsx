import { Flex, IconButton, Button, Text, Image } from "@chakra-ui/react"
import { Link } from "react-router-dom"


export const Header = ({trackName, switchEditMode}: {trackName: String, switchEditMode: () => void}) => {
    return (
        <Flex bgColor={""} shadow={"sm"} h={14} align={"center"} p={6} >
        <Link to={"/"}>
          <IconButton aria-label="" icon={<Image src={"../../svara-logo.svg"} alt="svara logo" h={10} />}  colorScheme={"pink.400"} bg={"pink.400"} rounded={"md"} href={"/"}/>
        </Link>
        <Text color={"gray"} w={"100%"} textAlign={"center"} fontWeight={"bold"} fontSize={"md"} >{trackName}</Text>
        {/* <Link to={"/editor/" + trackId} > */}
            <Button colorScheme='pink' rounded={"full"} onClick={switchEditMode} w={32}>編集モードへ</Button>
        {/* </Link> */}
    </Flex>
    )
}