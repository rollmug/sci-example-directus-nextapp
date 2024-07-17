'use client'

import React, { createContext, useState, useMemo } from "react";

export const StatusContext = createContext();

export default function StatusProvider({ children }) {
    const [statusData, setStatusData] = useState(null);
    const value = useMemo(() => ({statusData, setStatusData}), [statusData]);

    return (
         <StatusContext.Provider value={value}>{children}</StatusContext.Provider>
    )
}