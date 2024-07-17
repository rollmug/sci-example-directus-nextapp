"use client"

import React, { useContext } from "react";
import Image from "next/image";
import { PlaylistContext } from "@/app/playlistProvider";

export const PlaylistBtn = ({ playlist, size = "large" }) => {
    const filesBaseUrl = process.env.NEXT_PUBLIC_FILES_BASE_URL;
    const controlAPIUrl = process.env.NEXT_PUBLIC_SCI_CONTROL_API_URL + "/play";
    const playlistID = playlist.id;

    const { playlistSelected, setPlaylistSelected } = useContext(PlaylistContext);

    const selectPlaylist = async () => {
        const raw = JSON.stringify({
            "playlist": playlistID
        });

        try {
            const response = await fetch(controlAPIUrl, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                },
                body: raw,
            });

            const data = await response.json();

            // console.log(data);
            if (data.success) {
                setPlaylistSelected(playlist);
            } else {
                alert(`Error: ${data.error}`);
                console.log(data.error);
                console.log(raw);
                setPlaylistSelected(null);
            }
        } catch (error) {
            console.log(error);
            console.log(raw);
            alert(error);
        }
    }

    const handleClick = () => {
        selectPlaylist(playlistID);
    }

    var parentClasses = ['btn', 'h-auto', 'font-normal', 'text-2xl', 'uppercase', 'btn-neutral', 'rounded-none', 'p-2', 'bg-gradient-to-b', 'from-night-200', 'to-night-900', 'flex'].join(' ');
    var imgClasses = ['w-7', 'h-7', 'md:w-8 md:h-8', 'lg:w-9 lg:h-9'].join(' ');

    if (size === 'small') {
        parentClasses = ['btn', 'h-auto', 'font-normal', 'text-xl', 'uppercase', 'btn-neutral', 'rounded-none', 'p-2', 'bg-gradient-to-b', 'from-night-200', 'to-night-900', 'flex'].join(' ');
        imgClasses = ['w-5', 'h-5', 'md:w-6', 'md:h-6', 'lg:w-7', 'lg:h-7'].join(' ');
    }

    return (
        <div key={playlist.id} onClick={handleClick} className={parentClasses}>
            <div className={`img-${playlist.color.name} overflow-hidden rounded-full border-[1px] hidden xs:inline-block`}>
                <Image
                    src={`${filesBaseUrl}/${playlist.mood.icon.id}?width=60&fit=contain`}
                    width={42} height={42}
                    className={`${imgClasses} hidden xs:inline-block `}
                    priority
                    alt="" />
            </div>
            <span className={`text-${playlist.color.name}-secondary font-dukefill tracking-wider`}>{playlist.name}</span>
        </div>
    );
}