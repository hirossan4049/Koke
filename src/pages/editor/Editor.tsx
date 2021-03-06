import { Center, Box, Heading, Flex, Icon, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Text, ScaleFade, useToast, useBoolean } from "@chakra-ui/react";
import axios from "axios";

import { useState, useEffect, useCallback } from "react";
import { IoPause, IoPlay } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { TrackListsItemType, TrackListsType } from "../../actions/types";
import { useYoutube } from "../components/YoutubeEmbed";
import Youtube from "react-youtube";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";

import { EditTrackItem } from "./components/EditTrackItem";
import { Header } from "./components/Header";
import { apiURL } from "../../actions/constants";

export const Editor = () => {
    const { trackId } = useParams<{trackId: string}>();

    const [isLoading, setIsLoading] = useBoolean(true)

    const [tracklists, setTrackLists] = useState<TrackListsType>()
    // const [tracklists, setTrackLists] = useRecoilState(tracklistsState)
  
    const [playIndex, setPlayIndex] = useState(0)
    const toast = useToast()
  
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
      axios.get<TrackListsType>(apiURL + "/tracklists/" + trackId)
      .then(res => {
        setIsLoading.off()
        if (res.data != null) {
          setTrackLists(res.data)
        }else {
          axios.get("https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=" + trackId + "&format=json")
          .then(res => {
            setTrackLists({
              trackId: trackId!,
              trackName: res.data["title"],
              tracks: [{
                name: "Intro",
                time: 0
              }]
            })
          })

        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
      document.title = (tracklists?.trackName ?? "??????") + " - ???????????????"
    }, [tracklists?.trackName])
  
    const [count, setCount] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        if (isPlaying) {
          setCount(c => c + 1);
        }
      }, 1000);
      return () => clearInterval(interval);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    useEffect(() => {
        let lastIndex = 0
        tracklists?.tracks.forEach((track, index) => {
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
    
    const onAddClicked = (index: number) => {
      const tl = tracklists!.tracks
      console.log(seekBarValue)
      tl.splice(index + 1, 0, {name: "", time: parseInt(seekBarValue.toString())})
      setTrackLists({...tracklists!, tracks: tl})        
    }

    const onDeleteClicked = (index: number) => {
        const tl = tracklists!.tracks
        tl.splice(index, 1)
        setTrackLists({...tracklists!, tracks: tl})
    }

    const save = () => {
      setIsLoading.on()
      axios.post(apiURL + "/tracklists/update/" + trackId, tracklists)
      .then(res => {
        setIsLoading.off()
        console.log(res)
        toast({
          title: "????????????",
          position: "top",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      })
    }

    const onTrackChanged = (index: number, track: TrackListsItemType) => {
      const tracks = tracklists!.tracks
      tracks[index] = track
      setTrackLists({...tracklists!, tracks: tracks})
    }
  
  
    return (
      <>
      <Header trackName={tracklists?.trackName ?? "??????"} save={save} isLoading={isLoading} />
      <Center>
        <Box pb={82} pt={16} p={{base: 4, md: 32}} w={{base: "none",md: "6xl"}} pr={{ base: 0, md: 20}} align="center" >
          {/* <Input placeholder="?????????????????????" fontWeight={"bold"} fontSize={"xl"} value={tracklists?.trackName} onChange={(e) => {setTrackLists({...tracklists!, trackName: e.target.value})}} textAlign={"center"}></Input> */}
          <Heading as="h3" size="md" >{ tracklists?.trackName } </Heading>

  
          <Box bg="white" p={4} m={2} mr={14} mt={6} align="center" rounded="xl" shadow="sm">
            <Youtube
            videoId={trackId}
            onReady={onReady}
            opts={{ 
              width: "100%",
              playerVars: {
                controls: 1,
                disablekb: 1,
              }
            }}
            />
          </Box>

        <DragDropContext onDragEnd={handleDragEnd}>
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
                          <ScaleFade in={true}>
                            <EditTrackItem item={item} onAdd={() => onAddClicked(i)} onDelete={() => onDeleteClicked(i)} onTrackChanged={(item) => onTrackChanged(i, item)} />
                            </ScaleFade>
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
            <Text fontSize="18" fontWeight={"bold"}>{ tracklists?.tracks[playIndex]?.name }</Text>
            <Text fontSize="13" fontWeight={"bold"} color={"gray.500"}>{ tracklists?.trackName }</Text>
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