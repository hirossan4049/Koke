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
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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
        (result) => {
          const { source, destination } = result;
          const souTrack = tracklists!.tracks[source.index]
          const desTrack = tracklists!.tracks[destination.index]
          let tl = tracklists!
          console.log(tl.tracks[source.index].name, " to " , tracklists!.tracks[destination.index].name)
          console.log(source.index, " to " , destination.index)
        //   const tracks: TrackListsItemType[] = tl.tracks.slice() as TrackListsItemType[]
        //   tl.tracks.splice(source.index, source.index, tl.tracks[destination.index])
        //   tl.tracks.splice(destination.index, destination.index, souTrack)
          console.log(tl.tracks[source.index].name, " to " , tracklists!.tracks[destination.index].name)
          console.log(source.index, " to " , destination.index)

          const si = source.index
          const di = destination.index

        //   tl.tracks[si] = desTrack
          tl.tracks[di] = souTrack
          tl.tracks.splice(source.index, 1)
        //   tl.tracks = tracks as [TrackListsItemType]
          setTrackLists(tl)
        //   const _notSelected = notSelected.slice();
        //   const _Selected = selected.slice();
          // reorder

        //   if (source.droppableId === destination.droppableId) {
        //     const _items =
        //       source.droppableId === "notSelected" ? _notSelected : _Selected;
        //     const setData =
        //       source.droppableId === "notSelected" ? setNotSelected : setSelected;
        //     const [removed] = _items.splice(source.index, 1);
        //     _items.splice(destination.index, 0, removed);
        //     setData(_items);
        //   }
        //   // move to other column
        //   else {
        //     const sourceList =
        //       source.droppableId === "notSelected" ? _notSelected : _Selected;
        //     const destinationList =
        //       source.droppableId === "notSelected" ? _Selected : _notSelected;
        //     const [removed] = sourceList.splice(source.index, 1);
        //     destinationList.splice(destination.index, 0, removed);
        //     setNotSelected(_notSelected);
        //     setSelected(_Selected);
        //   }
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
                            {/* <EditTrackItem trackName={item.name} /> */}
                            {item.name}
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