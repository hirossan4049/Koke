import axios from "axios";
import { apiURL } from "./constants";
import { TrackListsType } from "./types";


// type fetchLatestTracklistsCallback = (result: [TrackListsType]) => void
// export const fetchLatestTracklists = ({ completion }: {completion: fetchLatestTracklistsCallback}) => {
//     axios.get<[TrackListsType]>(apiURL + "/latest-tracklists")
//     .then(res => {
//         completion(res.data)
//     })
// }

export function fetchLatestTracklists(callback: (result: [TrackListsType]) => void) {
    axios.get<[TrackListsType]>(apiURL + "/latest-tracklists")
    .then(res => {
        callback(res.data)
    })
}

// export const fetchTracklists = ({ trackId, completion }: {trackId: string, completion: (result: [TrackListsType]) => void}) => {
//     axios.get<[TrackListsType]>(apiURL + "/tracklists/" + trackId)
//     .then(res => {
//         completion(res.data)
//     })
// }

export function fetchTracklists(trackId: string, callback: (result: TrackListsType) => void) {
    axios.get<TrackListsType>(apiURL + "/tracklists/" + trackId)
    .then(res => {
        callback(res.data)
    })
}