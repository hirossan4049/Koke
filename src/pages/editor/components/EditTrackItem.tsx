import { Text, Flex, Input, Box, Icon, Collapse, IconButton, ScaleFade } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { IoAdd, IoMenu, IoTrashBinOutline } from "react-icons/io5"
import { TrackListsItemType } from "../../../actions/types"

function makeTime(num: number) {
    const timeH = ("0" + Math.floor(num % (24 * 60 * 60) / (60 * 60))).slice(-2)
    const timeM = ("0" + Math.floor(num % (24 * 60 * 60) % (60 * 60) / 60)).slice(-2)
    const timeS = ("0" + (num % (24 * 60 * 60) % (60 * 60) % 60)).slice(-2)
    return [timeH, timeM, timeS]
}
  

export const EditTrackItem = ({item, onAdd, onDelete, onTrackChanged}: {item: TrackListsItemType, onAdd: () => void, onDelete: () => void, onTrackChanged: (item: TrackListsItemType) => void}) => {
    const [hh, setHh] = useState("00")
    const [mm, setMm] = useState("00")
    const [ss, setSs] = useState("00")

    const [trackName, setTrackName] = useState(item.name)

    const [isHover, setIsHover] = useState(false) // Cell追加表示用のホバー
    const [isCellHover, setIsCellHover] = useState(false) // Cell全体のホバー

    useEffect(() => {
        const [h, m, s] = makeTime(item.time)

        setHh(h)
        setMm(m)
        setSs(s)
    }, [])

    useEffect(() => {
        setTrackName(item.name)
        const [h, m, s] = makeTime(item.time)
        if (h !== "00" || m !=="00" || s !== "00") {
            setHh(h)
            setMm(m)
            setSs(s)
        }
    }, [item])

    useEffect(() => {
        const h = Number(hh)
        const m = Number(mm)
        const s = Number(ss)
        const time = s + (m * 60) + (h * 60 * 60)
        const track = {
            name: trackName,
            time: time
        }
        onTrackChanged(track)
    }, [hh, mm, ss, trackName])

    return (
        <Box p={2} pr={0} onMouseEnter={() => {
            setIsHover(true)
            setIsCellHover(true)
        }} onMouseLeave={() => {
            setIsHover(false)
            setIsCellHover(false)
        }}>
        <Flex>
        <Flex rounded="xl" bg={"white"} shadow="sm" p={2} w={"100%"}>
            <Input type="number" step="1" placeholder="時" textAlign={"center"} value={hh} w={12} p={1} onChange={(v) => {setHh(v.target.value.slice(-2))}}/>
            <Text fontSize={"xl"} p={1}>:</Text>
            <Input type="number" step="1" placeholder="分" textAlign={"center"} value={mm} w={12} p={1} onChange={(v) => {setMm(v.target.value.slice(-2))}}/>
            <Text fontSize={"xl"} p={1}>:</Text>
            <Input type="number" step="1" placeholder="秒" textAlign={"center"} value={ss} w={12} p={1} onChange={(v) => {setSs(v.target.value.slice(-2))}}/>
            <Input placeholder="曲名を入力" ml={4} value={ trackName } onChange={(e) => {setTrackName(e.target.value)}} />
            <Icon as={IoMenu} w={6} h={6} m={2} color={"gray.400"} onMouseEnter={() => setIsHover(false)} onMouseLeave={() => setIsHover(true)} />
        </Flex>
        <ScaleFade in={isCellHover} initialScale={0.9}>
            <IconButton aria-label="Search" icon={<Icon as={IoTrashBinOutline} w={6} h={6} color={"red"} />} w={6}  p={4} m={2} onClick={onDelete} />
        </ScaleFade>
        </Flex>
        <Collapse in={isHover} animateOpacity>
        {/* IconButton aria-label="Search" icon=. */}
            {/* <Icon as={IoAdd} /> */}
            <IconButton aria-label="追加" icon={<Icon as={IoAdd} w={6} h={6} color={"gray.600"} />} w={"100%"} mt={2} onClick={onAdd} />
        </Collapse>
        </ Box>
    )
}