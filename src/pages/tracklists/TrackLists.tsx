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
import { YoutubeEmbed } from "./components/YoutubeEmbed";
import { tracklistsState } from "./recoil/atoms";


function makeTime(num: number) {
  var timeH = Math.floor(num % (24 * 60 * 60) / (60 * 60));
  var timeM = Math.floor(num % (24 * 60 * 60) % (60 * 60) / 60);
  var timeS =num % (24 * 60 * 60) % (60 * 60) % 60;
  var timeDMS = timeH + ':' + timeM + ':' + timeS + '';
  return timeDMS;
}

export const TrackLists = () => {
  const { trackId } = useParams<{trackId: string}>();

  const [tracklists, setTrackLists] = useRecoilState(tracklistsState)

  useEffect(() => {
    axios.get<TrackListsType>("http://localhost:8000/tracklists/" + trackId)
    .then(res => {
      setTrackLists(res.data)
    })
  }, [])
    return (
      <div>
        <h1>{ tracklists?.trackName } </h1>
        { tracklists?.tracks.map(track => (
        <TrackItem item={track} />
          ))
        }
        {/* <YoutubeEmbed /> */}

      </div>
    )
}