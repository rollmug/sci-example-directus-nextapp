"use client"

import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PlaylistContext } from "@/app/playlistProvider";
import { StatusContext } from "@/app/statusProvider";
import { DataContext } from "@/app/dataProvider";

export const NowPlaying = () => {
    const { statusData } = useContext(StatusContext);
    const { playlistSelected, setPlaylistSelected } = useContext(PlaylistContext);

    // const disablePlay = process.env.NEXT_PUBLIC_DISABLE_PLAY;

    const [justSelected, setJustSelected] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentPlaylist, setCurrentPlaylist] = useState(null);

    const testData = {
        name: "Test Playlist",
        color: {
            name: "Yellow"
        },
        mood: {
            icon: {
                id: "12360800-7218-4f86-b53c-b1eb3e97ac3b"
            }
        }
    }

    const resetTest = () => {
        setJustSelected(false);
        setIsPlaying(false);
        setProgress(0);
        setCurrentPlaylist(null);
        setPlaylistSelected(null);
    };

    const testSelected = () => {
        setJustSelected(true);
        setPlaylistSelected(testData);
    }

    const testPlaying = () => {
        setJustSelected(false);
        setIsPlaying(true);
        setCurrentPlaylistData(testData);
        setProgress(45);
    }

    const { currentPlaylistData, setCurrentPlaylistData } = useContext(DataContext);

    useEffect(() => {
        if (statusData) {
            if (statusData.mode === "jukebox-ready" && playlistSelected) {
                setJustSelected(true);
                setIsPlaying(false);

                //console.log("playlistSelected", playlistSelected);
            } else if (statusData.mode === "jukebox-playing") {
                setPlaylistSelected(null);
                setJustSelected(false);
                setIsPlaying(true);
                setProgress(parseFloat(statusData.currentPlaylist.progress_fraction) * 100);
                setCurrentPlaylist(statusData.currentPlaylist); // this is data that comes from the status API
                // currentPlaylistData is the data that comes from Directus GraphQL
                console.log("currentPlaylistData", currentPlaylistData);
            } else {
                setPlaylistSelected(null);
                setJustSelected(false);
                setIsPlaying(false);
            }
        }
    }, [statusData, playlistSelected]);

    return (
        <>
            <AnimatePresence>
                {justSelected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}

                        transition={{ duration: 0.5 }}
                        className="absolute z-20 inset-0 bg-night-800 bg-opacity-75 h-full w-full">
                        <div className="absolute inset-0 flex justify-center items-center">
                            <div className="text-white text-3xl font-meta w-full max-w-lg flex flex-col items-center gap-8">
                                <LoadingBubble text={playlistSelected.name} color={playlistSelected.color.name} icon={playlistSelected.mood.icon.id} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* {disablePlay != 'true' && ( */}
                <AnimatePresence>
                    {(isPlaying && currentPlaylistData) && (
                        <motion.div
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute z-20 inset-0 bg-night-800 bg-opacity-75 h-full w-full">
                            <div className="absolute inset-0 flex justify-center items-center">
                                <div className="text-white text-3xl font-meta w-full max-w-lg flex flex-col items-center gap-12">
                                    <PlayingBubble text={currentPlaylistData.name} color={currentPlaylistData.color.name} icon={currentPlaylistData.mood.icon.id} />
                                    <motion.div
                                        className="w-full"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: .8 }}
                                    >
                                        <ProgressBar progress={progress} />
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            {/* )} */}

            <div className="hidden">
                <p className="absolute bottom-0 z-50 p-4 flex flex-row gap-1">
                    <button className="btn btn-info" onClick={testSelected}>Select</button>
                    <button className="btn btn-accent" onClick={testPlaying}>Play</button>
                    <button className="btn btn-neutral" onClick={resetTest}>Reset</button>
                </p>
            </div>
        </>
    );
}

const LoadingBubble = ({ text, color, icon }) => {
    const filesBaseUrl = process.env.NEXT_PUBLIC_FILES_BASE_URL;
    var imgClasses = ['w-7', 'h-7', 'md:w-10 md:h-10', 'lg:w-11 lg:h-11'].join(' ');
    return (
        <>
            <motion.div
                className="w-[75%] aspect-square"
                initial={{ scale: 0.5, y: '100%' }}
                animate={{ scale: 1, y: 0 }}
                transition={
                    { duration: 3, ease: [0, 0.71, 0.2, 1.01] }
                }
            >
                <motion.div
                    className={`bg-${color}-primary bg-opacity-40 p-6 w-full aspect-square rounded-full `}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: .5, duration: 1 }}
                >
                    <div className={`bg-${color}-primary w-full aspect-square rounded-full p-4`}>
                        <div className="bg-night-800 w-full aspect-square rounded-full flex flex-col gap-4 items-center justify-center">
                            <motion.div
                                className="w-full aspect-square rounded-full flex flex-col gap-4 items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5, duration: 1 }}
                            >
                                <div className="text-center text-white font-dukefill tracking-wide uppercase text-2xl sm:text-3xl">
                                    {text}
                                </div>
                                <div className={`img-${color} overflow-hidden aspect-square rounded-full border-[1px] inline-flex`}>
                                    <Image
                                        src={`${filesBaseUrl}/${icon}?width=60&fit=contain`}
                                        width={42} height={42}
                                        className={`${imgClasses} hidden xs:inline-block `}
                                        priority
                                        alt="" />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: .5 }}
                className="w-full"
            >
                <ProgressBar progress={0} loading={true} />
            </motion.div>
        </>
    );
}

const PlayingBubble = ({ text, color, icon }) => {
    const filesBaseUrl = process.env.NEXT_PUBLIC_FILES_BASE_URL;
    var imgClasses = ['w-7', 'h-7', 'md:w-10 md:h-10', 'lg:w-11 lg:h-11'].join(' ');
    return (
        <div className={`bg-${color}-primary bg-opacity-40 p-6 w-[75%] aspect-square rounded-full `}>
            <div className={`bg-${color}-primary w-full aspect-square rounded-full p-4`}>
                <div className="bg-night-800 w-full aspect-square rounded-full flex flex-col gap-4 items-center justify-center">
                    <div className="text-center text-white font-dukefill tracking-wide uppercase text-2xl sm:text-3xl">
                        {text}
                    </div>

                    <div className={`img-${color} overflow-hidden aspect-square rounded-full border-[1px] inline-flex`}>
                        <Image
                            src={`${filesBaseUrl}/${icon}?width=60&fit=contain`}
                            width={42} height={42}
                            className={`${imgClasses} hidden xs:inline-block `}
                            priority
                            alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

const ProgressBar = ({ progress, loading }) => {
    if (loading) {
        return (
            <div className="w-full max-w-[70%] md:max-w-sm lg:max-w-md mx-auto flex flex-col gap-4 justify-center items-center">
                <progress className="progress progress-accent w-3/4 my-0 border border-night-100 overflow-hidden"></progress>
                <div className="font-meta text-lg text-center">
                    Playing momentarily
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[70%] md:max-w-sm lg:max-w-md mx-auto flex flex-col gap-4 justify-center items-center">
            <div className="mx-auto my-0 h-4 w-3/4 bg-night-800 border border-night-100 overflow-hidden">
                <div className="h-full bg-night-100 transition-all" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="font-meta text-lg text-center">
                {progress.toFixed(0)}%
            </div>
        </div>
    );
}