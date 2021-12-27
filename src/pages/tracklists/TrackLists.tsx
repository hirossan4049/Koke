import React, {
    useCallback,
    useEffect,
    useState,
    ChangeEventHandler
  } from "react";
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import axios from "axios";

import { TrackListsType } from "../../actions/types";
import { TrackItem } from "./components/TrackItem"
import { useYoutube, YoutubeEmbed } from "./components/YoutubeEmbed";
import { tracklistsState } from "./recoil/atoms";
import { Box, Heading, Flex, Text, Icon, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";

import Youtube from "react-youtube";
import { IoPause, IoPlay } from "react-icons/io5";


export const TrackLists = () => {
  const { trackId } = useParams<{trackId: string}>();

  const [tracklists, setTrackLists] = useRecoilState(tracklistsState)

  const [playIndex, setPlayIndex] = useState(0)
  const [sliderValue, setSliderValue] = useState(0)

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

  return (
    <>
      <Box pb={82} pt={16} pl={{ base: 0, md: 24}} pr={{ base: 0, md: 24}} align="center" >
        <Heading as="h3" size="md" >{ tracklists?.trackName } </Heading>

        <Box bg="white" p={2} m={4} mt={6} align="center" rounded="md" shadow="sm" >
          <Youtube
          videoId={trackId}
          onReady={onReady}
          opts={{
            playerVars: {
              controls: 1,
              disablekb: 1,
            }
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
      <Flex pos="fixed" zIndex={2} bg="white" h={"72px"} bottom={0} m={"4"} mr={"2%"} ml={"2%"} shadow="2xl" rounded="xl" w="96%" align={"center"}>
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
            onChangeEnd={(v) => onSeekButtonClick(seekBarValue)}
            value={seekBarValue}
             >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
      </Flex>
    </>
  )
}