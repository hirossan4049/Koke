import { Flex, IconButton, Button, Text, Image } from "@chakra-ui/react"
import { Link } from "react-router-dom"


export const Header = ({trackName, save}: {trackName: String, save: () => void}) => {
    return (
        <Flex bgColor={""} shadow={"sm"} h={14} align={"center"} p={6} >
        <Link to={"/"}>
          <IconButton aria-label="" icon={<Image src={"../../svara-logo.svg"} alt="svara logo" h={10} />}  colorScheme={"pink.400"} bg={"pink.400"} rounded={"md"} href={"/"} />
        </Link>
        <Text color={"gray"} w={"100%"} textAlign={"center"} fontWeight={"bold"} fontSize={"md"} >{trackName} - 編集モード</Text>
    <Button colorScheme='pink' rounded={"full"} w={24} onClick={save}>保存</Button>
    </Flex>
    )
}