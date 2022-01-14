import { Flex, IconButton, Button, Text, Img } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import Logo from "../../../assets/svara-logo.svg"


export const Header = ({trackName, switchEditMode}: {trackName: String, switchEditMode: () => void}) => {
    return (
        <Flex bgColor={""} shadow={"sm"} h={{base: 0, md: 14}} align={"center"} p={6} >
        <Link to={"/"}>
          <IconButton aria-label="" icon={<Img src={Logo} alt="svara logo" h={12} />}  colorScheme={"black"} bg={"black"} rounded={"md"} href={"/"}/>
        </Link>
        <Text color={"gray"} w={"100%"} textAlign={"center"} fontWeight={"bold"} fontSize={{base: 0, md: "md"}} >{trackName}</Text>
        <Button colorScheme='pink' rounded={"full"} onClick={switchEditMode} w={44}>編集モードへ</Button>
    </Flex>
    )
}