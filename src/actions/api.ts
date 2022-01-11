import axios from "axios";
import { TrackListsType } from "./types";

const url = "https://s-vara.herokuapp.com/"

type fetchLatestTracklistsCallback = (result: [TrackListsType]) => void
export const fetchLatestTracklists = ({ completion }: {completion: fetchLatestTracklistsCallback}) => {
    axios.get<[TrackListsType]>(url + "/latest-tracklists")
    .then(res => {
        // completion(res.data)
    })
}

export const fetchTracklists = ({ trackId, completion }: {trackId: string, completion: (result: [TrackListsType]) => void}) => {
    axios.get<[TrackListsType]>(url + "/tracklists/" + trackId)
    .then(res => {
        completion(res.data)
    })
}