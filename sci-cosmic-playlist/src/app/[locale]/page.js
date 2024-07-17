import React from "react";
import { unstable_setRequestLocale } from 'next-intl/server';
import { HomePage } from "@/components/Home";
import { getMuseumFavs, getAllPlaylists } from "@/lib/playlist-data";
import { Error } from "@/components/Error";

export default async function Home({ params: { locale } }) {
    unstable_setRequestLocale(locale);
    const museumFavs = await getMuseumFavs();
    const allPlaylists = await getAllPlaylists();
    const controlAPIStatus = process.env.SCI_CONTROL_API_URL + "/status";

    try {

        // this is really just to check if the control API is available, not to do anything with the data.
        const response = await fetch(controlAPIStatus, { cache: 'no-store', signal: AbortSignal.timeout( 7500 ) });
        const status = await response.json();

        if (museumFavs.error) {
            return <Error data={museumFavs} />
        }

        return (
            <HomePage museumFavs={museumFavs} allPlaylists={allPlaylists} />
        );
    } catch (error) {
        return <Error data={{
            error: 'The control API is not available.',
            message: 'Error'
        }} />
    }
}
