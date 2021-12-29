import { Center, Box, Heading, Flex, Icon, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Text, Button } from "@chakra-ui/react";
import axios from "axios";

import { useState, useEffect, useCallback } from "react";
import { IoPause, IoPlay } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { TrackListsItemType, TrackListsType } from "../../actions/types";
import { TrackItem } from "../tracklists/components/TrackItem";
import { useYoutube, YoutubeEmbed } from "../components/YoutubeEmbed";
import Youtube from "react-youtube";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";

import { tracklistsState } from "../tracklists/recoil/atoms";
import { EditTrackItem } from "./components/EditTrackItem";

export const Editor = () => {
    const { trackId } = useParams<{trackId: string}>();

    const [tracklists, setTrackLists] = useState<TrackListsType>()
  
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


      const handleDragEnd = useCallback(
        (result: DropResult) => {
          if (!result.destination) {
            return;
          }
    
          const newState = [...tracklists!.tracks];
    
          const [removed] = newState.splice(result.source.index, 1);
          newState.splice(result.destination.index, 0, removed);
          const tl = tracklists!
          tl.tracks = newState as [TrackListsItemType]
          setTrackLists(tl);
        },
        [tracklists]
      );
    
  
  
    return (
      <>
      <Flex bgColor={"white"} shadow={"sm"} h={14} align={"center"} >
              <Text>編集</Text>
          <Button colorScheme='pink' rounded={"full"}>保存</Button>
      </Flex>
      <Center>
        <Box pb={82} pt={16} p={{base: 4, md: 32}} w={{base: "none",md: "6xl"}} pr={{ base: 0, md: 24}} align="center" >
          <Heading as="h3" size="md" >{ tracklists?.trackName } </Heading>
  
          <Box bg="white" p={4} m={4} mt={6} align="center" rounded="xl" shadow="sm">
            {/* <Youtube
            videoId={trackId}
            onReady={onReady}
            opts={{ 
              width: "100%",
              playerVars: {
                controls: 1,
                disablekb: 1,
              }
            }}
            /> */}
          </Box>

        <DragDropContext onDragEnd={handleDragEnd}>
          {/* <Droppable droppableId="characters">
            {(provided) => (
                <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                    { tracklists?.tracks.map((track, index) => (<EditTrackItem />)) }
                </ul>
            )}
            </Droppable> */}

            <Droppable key="selected" droppableId="selected">
                {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                    {tracklists?.tracks.map((item, i) => (
                    <Draggable draggableId={i.toString()} key={i} index={i}>
                        {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <EditTrackItem trackName={item.name} />
                            {/* {item.name} */}
                        </div>
                        )}
                    </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
                )}
            </Droppable>

            </DragDropContext>

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
      </>
    )
  }