import { Text, Flex, Input, Box, Spacer, Icon } from "@chakra-ui/react"
import { useState } from "react"
import { IoMenu } from "react-icons/io5"


export const EditTrackItem = ({trackName}: {trackName: string}) => {
    const [hh, setHh] = useState("00")
    const [mm, setMm] = useState("00")
    const [ss, setSs] = useState("00")

    return (
        // m={4}
        <Box p={2}>
        <Flex rounded="xl" bg={"white"} shadow="sm" p={2}>
            <Input type="number" step="1" placeholder="時" value={hh} w={12} p={1} onChange={(v) => {setHh(v.target.value.slice(-2))}}/>
            <Text fontSize={"xl"} p={1}>:</Text>
            <Input type="number" step="1" placeholder="分" value={mm} w={12} p={1} onChange={(v) => {setMm(v.target.value.slice(-2))}}/>
            <Text fontSize={"xl"} p={1}>:</Text>
            <Input type="number" step="1" placeholder="秒" value={ss} w={12} p={1} onChange={(v) => {setSs(v.target.value.slice(-2))}}/>
            <Input placeholder="曲名を入力" ml={4} value={ trackName } />
            <Icon as={IoMenu} w={6} h={6} m={2} color={"gray.400"} />
        </Flex>
        </ Box>
    )
}