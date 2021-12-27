
export interface TrackListsType {
    trackId: string
    trackName: string
    tracks: [TrackListsItemType]
}

export interface TrackListsItemType {
    name: string
    time: number
}