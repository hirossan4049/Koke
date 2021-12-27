import React, { } from "react";
import { useRecoilState } from 'recoil'

import { TrackListsItemType } from "../../../actions/types";

export const TrackItem = ({ item }: {item: TrackListsItemType}) => {
    return (
        <>
        <h2> { item.name } </h2>
        <h3> { item.time } </h3>
        </>
    )
}