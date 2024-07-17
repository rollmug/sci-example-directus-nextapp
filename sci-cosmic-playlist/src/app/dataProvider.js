'use client'

import React, { createContext, useState, useMemo } from "react";

export const DataContext = createContext();

export default function DataProvider({ children }) {
    const [currentPlaylistData, setCurrentPlaylistData] = useState(null);
    const value = useMemo(() => ({currentPlaylistData, setCurrentPlaylistData}), [currentPlaylistData]);

    return (
         <DataContext.Provider value={value}>{children}</DataContext.Provider>
    )
}