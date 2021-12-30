import { Text, Flex, Input, Box, Spacer, Icon, Collapse, IconButton } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { IoAdd, IoMenu } from "react-icons/io5"
import { TrackListsItemType } from "../../../actions/types"

function makeTime(num: number) {
    const timeH = ("0" + Math.floor(num % (24 * 60 * 60) / (60 * 60))).slice(-2)
    const timeM = ("0" + Math.floor(num % (24 * 60 * 60) % (60 * 60) / 60)).slice(-2)
    const timeS = ("0" + (num % (24 * 60 * 60) % (60 * 60) % 60)).slice(-2)
    return [timeH, timeM, timeS]
}
  

export const EditTrackItem = ({item, onAdd}: {item: TrackListsItemType, onAdd: () => void}) => {
    const [hh, setHh] = useState("00")
    const [mm, setMm] = useState("00")
    const [ss, setSs] = useState("00")

    const [trackName, setTrackName] = useState(item.name)

    const [isHover, setIsHover] = useState(false)

    useEffect(() => {
        const [h, m, s] = makeTime(item.time)

        setHh(h)
        setMm(m)
        setSs(s)
    }, [])

    useEffect(() => {
        setTrackName(item.name)
    }, [item])

    return (
        // m={4}
        <Box p={2} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        <Flex rounded="xl" bg={"white"} shadow="sm" p={2}>
            <Input type="number" step="1" placeholder="時" textAlign={"center"} value={hh} w={12} p={1} onChange={(v) => {setHh(v.target.value.slice(-2))}}/>
            <Text fontSize={"xl"} p={1}>:</Text>
            <Input type="number" step="1" placeholder="分" textAlign={"center"} value={mm} w={12} p={1} onChange={(v) => {setMm(v.target.value.slice(-2))}}/>
            <Text fontSize={"xl"} p={1}>:</Text>
            <Input type="number" step="1" placeholder="秒" textAlign={"center"} value={ss} w={12} p={1} onChange={(v) => {setSs(v.target.value.slice(-2))}}/>
            <Input placeholder="曲名を入力" ml={4} value={ trackName } onChange={(e) => {setTrackName(e.target.value)}} />
            <Icon as={IoMenu} w={6} h={6} m={2} color={"gray.400"} onMouseEnter={() => setIsHover(false)} onMouseLeave={() => setIsHover(true)} />
        </Flex>
        <Collapse in={isHover} animateOpacity>
        {/* IconButton aria-label="Search" icon=. */}
            {/* <Icon as={IoAdd} /> */}
            <IconButton aria-label="追加" icon={<Icon as={IoAdd} w={6} h={6} color={"gray.600"} />} w={"100%"} mt={2} onClick={onAdd} />
        </Collapse>
        </ Box>
    )
}