import { Flex, IconButton, Button, Text, Img } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import Logo from "../../../assets/svara-logo.svg"


export const Header = ({trackName, save}: {trackName: String, save: () => void}) => {
    return (
        <Flex bgColor={""} shadow={"sm"} h={14} align={"center"} p={6} >
        <Link to={"/"}>
          <IconButton aria-label="" icon={<Img src={Logo} alt="svara logo" h={12} />}  colorScheme={"black"} bg={"black"} rounded={"md"} href={"/"}/>
        </Link>
        <Text color={"gray"} w={"100%"} textAlign={"center"} fontWeight={"bold"} fontSize={"md"} >{trackName} - 編集モード</Text>
    <Button colorScheme='pink' rounded={"full"} w={24} onClick={save}>保存</Button>
    </Flex>
    )
}