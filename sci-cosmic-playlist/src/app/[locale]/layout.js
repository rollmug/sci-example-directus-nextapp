import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { ApolloWrapper } from "@/lib/apollo-provider";
import localFont from 'next/font/local';
import PlaylistProvider from '../playlistProvider';
import StatusProvider from '../statusProvider';
import DataProvider from '../dataProvider';

export const generateStaticParams = () => {
    return [{ locale: 'en' }, { locale: 'es' }];
}

const meta = localFont({
    src: '../fonts/MetaMediumLF-Roman.woff2', weight: '500', style: 'normal', display: 'swap', variable: '--font-meta'
});

const dukeRegular = localFont({
    src: '../fonts/Duke-Regular.woff2', weight: 'normal', style: 'normal', display: 'swap', variable: '--font-duke'
});

const dukeFill = localFont({
    src: '../fonts/Duke-Fill.woff2', weight: 'normal', style: 'normal', display: 'swap', variable: '--font-dukefill'
});

const dukeShadow = localFont({
    src: '../fonts/Duke-Shadow.woff2', weight: 'normal', style: 'normal', display: 'swap', variable: '--font-dukeshadow'
});

export default async function LocaleLayout({ children, params: { locale } }) {
    unstable_setRequestLocale(locale);
    const messages = await getMessages();

    return (
        <html lang={locale} data-theme="night" className={`${meta.variable} ${dukeRegular.variable} ${dukeFill.variable} ${dukeShadow.variable}`}>
            <body>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <ApolloWrapper>
                        <DataProvider>
                            <StatusProvider>
                                <PlaylistProvider>
                                    {children}
                                </PlaylistProvider>
                            </StatusProvider>
                        </DataProvider>
                    </ApolloWrapper>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}