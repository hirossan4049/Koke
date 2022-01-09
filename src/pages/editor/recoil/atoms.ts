import { atom } from "recoil";
import { TrackListsType } from "../../../actions/types";

export const tracklistsState = atom<TrackListsType | null>({
    key: 'tracklistsState',
    default: null,
})