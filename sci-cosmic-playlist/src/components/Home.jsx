'use client'

import React, { useState, useContext, useEffect } from "react";
import { Container } from "./Container";
import { useLocale, useTranslations } from 'next-intl';
import { PlaylistBtn } from "./PlaylistButton";
import Link from 'next/link';
import useSWR from 'swr';
import { Error } from "./Error";
import { VisitorShows } from "./VisitorShows";
import { StatusContext } from "@/app/statusProvider";
import { DataContext } from "@/app/dataProvider";
const fetcher = (url) => fetch(url).then((res) => res.json());

export const HomePage = ({ museumFavs, allPlaylists }) => {
    const t = useTranslations('home');
    const { setStatusData } = useContext(StatusContext);
    const { setCurrentPlaylistData } = useContext(DataContext);
    const controlAPIStatus = process.env.NEXT_PUBLIC_SCI_CONTROL_API_URL + "/status";

    const [statusError, setStatusError] = useState(null);

    const devMode = process.env.NEXT_PUBLIC_DEV_MODE;

    const { data, error, isLoading } = useSWR(
        controlAPIStatus,
        fetcher,
        { refreshInterval: 2 * 1000 }
    );

    useEffect(() => {
        console.log(data)

        if (data) {
            if (data.status === 'Error' && devMode !== 'true') {
                setStatusData(null);
                const errorTypes = [];
                if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
                    data.errors.forEach((error) => {
                        errorTypes.push(error.errorType);
                    });
                }
                setStatusError({
                    message: 'Control API Status Error',
                    error: errorTypes.join('<br> ')
                });
            } else {
                setStatusData(data);

                if (data.currentPlaylist && data.currentPlaylist.id) {
                    const playlist = allPlaylists.find(x => x.id === data.currentPlaylist.id);
                    setCurrentPlaylistData(playlist);
                } else {
                    setCurrentPlaylistData(null);
                }
            }
        } else {
            setStatusData(null);
        }
    }, [data]);

    if (isLoading) {
        return <Error data={{
            error: '',
            message: 'Loading...'
        }} />
    }

    if (error) {
        return <Error data={{
            error: 'The control API is not available.',
            message: 'Error'
        }} />
    }

    return (
        <>
            {statusError ? <Error data={statusError} /> :
                <Container className="main-player-ui-grid">
                    <section className="box-content">
                        <div className="grid _grid-rows-3 gap-3 sm:gap-4 md:gap-6 h-[calc(100vh-70px)] max-h-screen overflow-hidden pt-14 px-14 content-start">

                            {/* Grid Item 1 */}
                            <div className="_pb-8">
                                <div className="relative h-14 sm:h-20 text-5xl sm:text-7xl uppercase leading-none">
                                    <h1 className="absolute text-star-100 font-dukefill">{t('header')}</h1>
                                    <h1 className="absolute text-star-200 font-dukeshadow">{t('header')}</h1>
                                </div>
                                <h2 className=" text-white font-meta text-xl">{t('subheader')}</h2>
                            </div>

                            {/* Grid Item 2 */}
                            <div className="_row-start-2 _row-span-1 _border">
                                {museumFavs.length > 0 ? (
                                    <div className="_my-4">
                                        <p className="my-3 font-meta text-white uppercase">{t('favs')}</p>
                                        <div className={`grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 md:gap-4`}>
                                            {
                                                museumFavs.map((playlist) => (
                                                    <div key={playlist.id}>
                                                        <PlaylistBtn playlist={playlist} />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <p className="my-3 font-meta text-white uppercase">{t('favs')}</p>
                                        <p className="font-meta text-base">No museum favorites found.</p>
                                    </>
                                )}
                            </div>

                            {/* Grid Item 3 */}
                            <VisitorShows className="_row-start-4 row-span-3 overflow-scroll" />

                            {/* Grid Item 4 */}

                        </div>
                        <LanguageSwitcher />
                    </section>
                </Container>
            }

        </>



    );
};

const LanguageSwitcher = () => {
    const locale = useLocale();
    return (
        <div className="flex flex-row justify-center my-8">
            <div className="flex flex-row gap-2 uppercase font-meta">
                <Link href="/en/" className={`${locale === 'en' ? 'text-yellow-200' : ''}`}>eng</Link>
                <span>|</span>
                <Link href="/es/" className={`${locale === 'es' ? 'text-yellow-200' : ''}`}>esp</Link>
            </div>
        </div>
    );
}