import React, {
    useCallback,
    useEffect,
    useState,
    ChangeEventHandler
  } from "react";
import { Link, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import axios from "axios";

import { TrackListsType } from "../../actions/types";
import { TrackItem } from "./components/TrackItem"
import { useYoutube, YoutubeEmbed } from "../components/YoutubeEmbed";
import { tracklistsState } from "./recoil/atoms";
import { Box, Heading, Flex, Text, Icon, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Center, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Stack } from "@chakra-ui/react";

import Youtube from "react-youtube";
import { IoPause, IoPlay } from "react-icons/io5";
import { Header } from "./components/Header";


export const TrackLists = () => {
  const { trackId } = useParams<{trackId: string}>();

  const [tracklists, setTrackLists] = useRecoilState(tracklistsState)
  const { isOpen: isSwitchEditModeDialogOpen, onOpen: onSwitchEditModeDialogOpen, onClose: onSwitchEditModeDialogClose } = useDisclosure()
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const [playIndex, setPlayIndex] = useState(0)

  const {
    isPlaying,
    duration,
    seekBarValue,
    onReady,
    onPlayPauseButtonClick,
    onSeekButtonClick,
    onSeekBarChange
  } = useYoutube();

  useEffect(() => {
    axios.get<TrackListsType>("http://localhost:8000/tracklists/" + trackId)
    .then(res => {
      setTrackLists(res.data)
    })
  }, [])

  useEffect(() => {
    document.title = tracklists?.trackName ?? "無名"
  }, [tracklists?.trackName])

  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setCount(c => c + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
      let lastIndex = 0
      tracklists?.tracks.map((track, index) => {
        if (seekBarValue >= track.time) {
          lastIndex = index
        }
      })
      if (playIndex !== lastIndex) {
        setPlayIndex(lastIndex)
      }
    
  }, [count])


  return (
    <>
    <Header trackName={tracklists?.trackName ?? "無名"} switchEditMode={onSwitchEditModeDialogOpen} />
    <Center>
      <Box pb={82} pt={16} p={{base: 4, md: 32}} w={{base: "none",md: "6xl"}} pr={{ base: 0, md: 24}} align="center" >
        <Heading as="h3" size="md" >{ tracklists?.trackName } </Heading>

        <Box bg="white" p={4} m={4} mt={6} align="center" rounded="xl" shadow="sm">
          <Youtube
          videoId={trackId}
          onReady={onReady}
          onError={(error) => {console.log("youtubeerror: ", error)}}
          opts={{ 
            width: "100%",
            playerVars: {
              controls: 1,
              disablekb: 1,
            },
          }}
          />
        </Box>

        { tracklists?.tracks.map((track, index) => (
        <TrackItem item={track} isPlaying={playIndex == index} onClick={() => {
          onSeekButtonClick(track.time)
          setPlayIndex(index) 
          } }/>
          ))
        }
      </Box>
    </Center>
        
      <Flex pos="fixed" zIndex={2} bg="white" h={"72px"} bottom={0} m={"4"} mr={"2%"} ml={"2%"} shadow="2xl" rounded="2xl" w="96%" align={"center"}>
        <Icon as={isPlaying ? IoPause : IoPlay} w={7} h={7} color={"gray.600"} ml={4} mb={4} onClick={() => onPlayPauseButtonClick()} />
        <Box ml={4} mb={4}>
          <Text fontSize="18" fontWeight={"bold"}>{tracklists?.tracks[playIndex].name }</Text>
          <Text fontSize="13" fontWeight={"bold"} color={"gray.500"}>{tracklists?.trackName }</Text>
        </Box>
        <Box pos="absolute" zIndex={3} w="98%" bottom={0} mr={"1%"} ml={"1%"}>
          <Slider
            id="slider"
            min={0}
            max={duration}
            onChange={(v) => onSeekBarChange(v)}
            onChangeEnd={(v) => {
              setCount(count + 1)
              onSeekButtonClick(seekBarValue) 
            }}
            value={seekBarValue}
             >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
      </Flex>
      {(tracklists?.tracks.length === undefined) &&
        <Center>
          <Stack spacing={3}>
            <Text textAlign={"center"}>この動画のトラックリストがありませんでした。</Text>
            <Text textAlign={"center"}>もし時間があれば編集モードに移動してトラックリストを入力しませんか？</Text>
          </Stack>
        </Center>
       }

      
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onSwitchEditModeDialogClose}
        isOpen={isSwitchEditModeDialogOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>編集モードに移動しますか？</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>

          </AlertDialogBody>
          <AlertDialogFooter>
            <Button  onClick={onSwitchEditModeDialogClose}>
              いいえ
            </Button>
            <Link to={"/editor/" + trackId}>
              <Button colorScheme='pink' ml={3}>
                はい
              </Button>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}