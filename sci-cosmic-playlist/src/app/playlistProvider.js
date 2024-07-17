'use client'

import React, { createContext, useState, useMemo } from "react";

export const PlaylistContext = createContext();

export default function PlaylistProvider({ children }) {
    const [playlistSelected, setPlaylistSelected] = useState(null);
    const value = useMemo(() => ({playlistSelected, setPlaylistSelected}), [playlistSelected]);

    return (
         <PlaylistContext.Provider value={value}>{children}</PlaylistContext.Provider>
    )
}